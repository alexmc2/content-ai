// import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
// import { Configuration, OpenAIApi } from 'openai';
// import clientPromise from '../../lib/mongodb';

// export default withApiAuthRequired(async function handler(req, res) {
//   const { user } = await getSession(req, res);
//   const client = await clientPromise;
//   const db = client.db('Content-AI');
//   const userProfile = await db.collection('users').findOne({
//     auth0Id: user.sub,
//   });

//   if (!userProfile?.availableTokens) {
//     res.status(403);
//     return;
//   }



//   const config = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
//   });
//   const openai = new OpenAIApi(config);

//   const { topic, keywords } = req.body;

//   if (!topic || !keywords) {
//     res.status(422);
//     return;
//   }

//   const postContentResult = await openai.createChatCompletion({
//     model: 'gpt-3.5-turbo',
//     messages: [
//       {
//         role: 'system',
//         content: 'You are a knowledgeable assistant with expertise in generating detailed and engaging articles.',
//       },
//       {
//         role: 'user',
//         content: `Write a long and detailed article about ${topic}, that targets the following comma-separated keywords: ${keywords}.
//         The response should be formatted in SEO-friendly HTML,
//         limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`,      },
//     ],
//     temperature: 0.8,
  
//   });

//   const postContent = postContentResult.data.choices[0]?.message.content || '';

//   const titleResult = await openai.createChatCompletion({
//     model: 'gpt-3.5-turbo',
//     messages: [
//       {
//         role: 'system',
//         content: 'You are a knowledgeable assistant with expertise in generating detailed and engaging articles.',
//       },
//       {
//         role: 'user',
//         content: `Write a long and detailed article about ${topic}, that targets the following comma-separated keywords: ${keywords}.
//     The response should be formatted in SEO-friendly HTML,
//     limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`,
//       },
//       {
//         role: 'assistant',
//         content: postContent,
//       },
//       {
//         role: 'user',
//         content: 'Generate appropriate title text for the above post',
//       },
//     ],
//     temperature: 0.8,
//   });

//   const metaDescriptionResult = await openai.createChatCompletion({
//     model: 'gpt-3.5-turbo',
//     messages: [
//       {
//         role: 'system',
//         content: 'You are a knowledgeable assistant with expertise in generating detailed and engaging articles.',
//       },
//       {
//         role: 'user',
//         content: `Write a long and detailed detailed article about ${topic}, that targets the following comma-separated keywords: ${keywords}.
//     The response should be formatted in SEO-friendly HTML,
//     limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol. `,
//       },

//       {
//         role: 'assistant',
//         content: postContent,
//       },
//       {
//         role: 'user',
//         content: 'Generate appropriate description text for the above post',
//       },
//     ],
//     temperature: 0.8,
//   });

//   const title = titleResult.data.choices[0]?.message.content || '';
//   const metaDescription =
//     metaDescriptionResult.data.choices[0]?.message.content || '';

//   console.log(postContentResult.data.choices[0]?.message.content);

//   await db.collection('users').updateOne(
//     {
//       auth0Id: user.sub,
//     },
//     {
//       $inc: {
//         availableTokens: -1,
//       },
//     }
//   );

//   const currentDate = new Date();


//   const post = await db.collection('posts').insertOne({
//     postContent: postContent || '',
//     title: title || '',
//     metaDescription: metaDescription || '',
//     topic,
//     keywords,
//     userId: userProfile._id,
//     created: currentDate,
//   });

//   console.log('POST: ', post);

//   res.status(200).json({
//     postId: post.insertedId,
//   });
// });


import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { Configuration, OpenAIApi } from 'openai';
import clientPromise from '../../lib/mongodb';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

async function generateContent(topic, keywords) {
  return await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are a knowledgeable assistant with expertise in generating detailed and engaging articles.',
      },
      {
        role: 'user',
        content: `Write a long and detailed article about ${topic}, targeting the keywords: ${keywords} Use references to support scientific claims. The response should be in SEO-friendly HTML.`,
      },
    ],
    temperature: 0.8,
  });
}

async function generateTitle(postContent) {
  return await openai.createChatCompletion({
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
}

async function generateMetaDescription(postContent) {
  return await openai.createChatCompletion({
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
}

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const { user } = await getSession(req, res);
    const client = await clientPromise;
    const db = client.db('Content-AI');
    const userProfile = await db.collection('users').findOne({
      auth0Id: user.sub,
    });

    if (!userProfile?.availableTokens) {
      return res.status(403).send('Insufficient tokens');
    }

    const { topic, keywords } = req.body;

    if (!topic || !keywords) {
      return res.status(422).send('Topic and keywords are required');
    }

    const postContentResult = await generateContent(topic, keywords);
    const postContent = postContentResult.data.choices[0]?.message.content || '';

    const titleResult = await generateTitle(postContent);
    const title = titleResult.data.choices[0]?.message.content || '';

    const metaDescriptionResult = await generateMetaDescription(postContent);
    const metaDescription = metaDescriptionResult.data.choices[0]?.message.content || '';

    await db.collection('users').updateOne(
      {
        auth0Id: user.sub,
      },
      {
        $inc: {
          availableTokens: -1,
        },
      }
    );

    const currentDate = new Date();

    const post = await db.collection('posts').insertOne({
      postContent,
      title,
      metaDescription,
      topic,
      keywords,
      userId: userProfile._id,
      created: currentDate,
    });

    res.status(200).json({
      postId: post.insertedId,
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal server error');
  }
});
