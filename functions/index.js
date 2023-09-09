const clientPromise = require('./mongodb');
const functions = require('firebase-functions');
const { Configuration, OpenAIApi } = require('openai');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const cors = require('cors');

const auth0Client = jwksClient({
  jwksUri: functions.config().auth0.issuer_base_url + '/.well-known/jwks.json',
});

function getKey(header, callback) {
  auth0Client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

async function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      getKey,
      {
        audience: functions.config().auth0.client_id,
        issuer: functions.config().auth0.issuer_base_url,
        algorithms: ['RS256'],
      },
      (err, decoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(decoded);
        }
      }
    );
  });
}
const corsHandler = cors({ origin: true });


module.exports = {
  generatePost: functions.https.onRequest(async (req, res) => {
    corsHandler(req, res, async () => {
    try {
      console.log('Incoming Request:', req.headers, req.body);
      const token = req.headers.authorization.split('Bearer ')[1];
      const decoded = await verifyToken(token);
      const userId = decoded.sub;

      const client = await clientPromise;
      const db = client.db('Content-AI');
      const userProfile = await db.collection('users').findOne({
        auth0Id: userId,
      });
      console.log('User Profile:', userProfile);

      if (!userProfile || !userProfile.availableTokens) {
        return res.status(403).json({ error: 'No available tokens.' });
      }

      const openAIConfig = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      console.log('OpenAI Config:', openAIConfig);
      const openai = new OpenAIApi(openAIConfig);

      const { topic, keywords } = req.body;

      if (!topic || !keywords) {
        return res.status(422).json({ error: 'Topic or keywords missing.' });
      }

      const postContentResult = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content:
              'You are a knowledgeable, helpful, and intelligent assistant with expertise in generating detailed and engaging articles.',
          },
          {
            role: 'user',
            content: `Write a very long and detailed article about ${topic}, that targets the following comma-separated keywords: ${keywords}. Use descriptive examples where appropriate. Use references to support scientific claims. 
        The response should be formatted in SEO-friendly HTML,
        limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`,
          },
        ],
        temperature: 0.8,
      });
      console.log('Post Content Result:', postContentResult);

      const postContent =
        postContentResult.data.choices[0]?.message.content || '';
      

      const titleResult = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a knowledgeable assistant.',
          },
          {
            role: 'assistant',
            content: postContent,
          },
          {
            role: 'user',
            content: 'Generate an appropriate title for the above post',
          },
        ],
        temperature: 0.8,
      });

      const metaDescriptionResult = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a knowledgeable assistant.',
          },
          {
            role: 'assistant',
            content: postContent,
          },
          {
            role: 'user',
            content: 'Generate an appropriate description for the above post',
          },
        ],
        temperature: 0.8,
      });

      const title = titleResult.data.choices[0]?.message.content || '';
      const metaDescription =
        metaDescriptionResult.data.choices[0]?.message.content || '';

      console.log(postContentResult.data.choices[0]?.message.content);

      await db.collection('users').updateOne(
        {
          auth0Id: userId,
        },
        {
          $inc: {
            availableTokens: -1,
          },
        }
      );

      const currentDate = new Date();

      const post = await db.collection('posts').insertOne({
        postContent: postContent || '',
        title: title || '',
        metaDescription: metaDescription || '',
        topic,
        keywords,
        userId: userProfile._id,
        created: currentDate,
      });

      console.log('Inserted Post:', post);

      res.status(200).json({
        postId: post.insertedId,
      });
    } catch (error) {
      console.log('Error occurred:', error);
      res
        .status(500)
        .json({ error: 'Internal Server Error', details: error.message });
    }
  }),
};
