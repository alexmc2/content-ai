import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { Configuration, OpenAIApi } from 'openai';
import clientPromise from '../../lib/mongodb';
import fetch from 'node-fetch';

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const { user } = await getSession(req, res);
    const client = await clientPromise;
    const db = client.db('Content-AI');
    const userProfile = await db.collection('users').findOne({
      auth0Id: user.sub,
    });

    if (!userProfile?.availableTokens) {
      return res.status(403).json({ error: 'No available tokens.' });
    }

    const openAIConfig = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
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
          content: `Write a very long and detailed article about ${topic}, that targets the following comma-separated keywords: ${keywords}. Your response should be 1,000 words or more. Use descriptive examples where appropriate. Use references to support scientific claims.
        The response should be formatted in SEO-friendly HTML,
        limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`,
        },
      ],
      temperature: 0.8,
    });

    const postContent =
      postContentResult.data.choices[0]?.message.content || '';
    console.time(postContent);

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
      postContent: postContent || '',
      title: title || '',
      metaDescription: metaDescription || '',
      topic,
      keywords,
      userId: userProfile._id,
      created: currentDate,
    });

    console.log('POST: ', post);

    res.status(200).json({
      postId: post.insertedId,
    });
  } catch (error) {
    console.log('Error occurred:', error);
    res
      .status(500)
      .json({ error: 'Internal Server Error', details: error.message });
  }
});

// import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
// import { Configuration, OpenAIApi } from 'openai';
// import fetch from 'node-fetch';

// export default withApiAuthRequired(async function handler(req, res) {
//   try {
//     const { user } = await getSession(req, res);

//     const MONGO_DATA_API_BASE_URL =
//       'https://eu-west-2.aws.data.mongodb-api.com/app/data-esszz/endpoint/data/v1';
//     const headers = {
//       'Content-Type': 'application/json',
//       'Access-Control-Request-Headers': '*',
//       'api-key':
//         '',
//     };

//     const userProfileResponse = await fetch(
//       `${MONGO_DATA_API_BASE_URL}/action/findOne`,
//       {
//         method: 'POST',
//         headers: headers,
//         body: JSON.stringify({
//           dataSource: 'Cluster0',
//           database: 'Content-AI',
//           collection: 'users',
//           filter: { auth0Id: user.sub },
//         }),
//       }
//     );

//     if (!userProfileResponse.ok) {
//       throw new Error(
//         `Error fetching user profile: ${userProfileResponse.statusText}`
//       );
//     }
//     const userProfileData = await userProfileResponse.json();
//     console.log('Full User Profile Data:', userProfileData);
//     if (!userProfileData.document) {
//       throw new Error('User profile data is missing or empty.');
//     }
//     const userProfile = userProfileData.document;

//     const openAIConfig = new Configuration({
//       apiKey: process.env.OPENAI_API_KEY,
//     });
//     const openai = new OpenAIApi(openAIConfig);

//     const { topic, keywords } = req.body;

//     if (!topic || !keywords) {
//       return res.status(422).json({ error: 'Topic or keywords missing.' });
//     }

//     const postContentResult = await openai.createChatCompletion({
//       model: 'gpt-3.5-turbo',
//       messages: [
//         {
//           role: 'system',
//           content:
//             'You are a knowledgeable, helpful, and intelligent assistant with expertise in generating detailed and engaging articles.',
//         },
//         {
//           role: 'user',
//           content: `Write a very long and detailed article about ${topic}, that targets the following comma-separated keywords: ${keywords}. Your response should be 1,000 words or more. Use descriptive examples where appropriate. Use references to support scientific claims.
//         The response should be formatted in SEO-friendly HTML,
//         limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`,
//         },
//       ],
//       temperature: 0.8,
//     });

//     const postContent =
//       postContentResult.data.choices[0]?.message.content || '';
//     console.time(postContent);

//     const titleResult = await openai.createChatCompletion({
//       model: 'gpt-3.5-turbo',
//       messages: [
//         {
//           role: 'system',
//           content: 'You are a knowledgeable assistant.',
//         },
//         {
//           role: 'assistant',
//           content: postContent,
//         },
//         {
//           role: 'user',
//           content: 'Generate an appropriate title for the above post',
//         },
//       ],
//       temperature: 0.8,
//     });

//     const metaDescriptionResult = await openai.createChatCompletion({
//       model: 'gpt-3.5-turbo',
//       messages: [
//         {
//           role: 'system',
//           content: 'You are a knowledgeable assistant.',
//         },
//         {
//           role: 'assistant',
//           content: postContent,
//         },
//         {
//           role: 'user',
//           content: 'Generate an appropriate description for the above post',
//         },
//       ],
//       temperature: 0.8,
//     });

//     const title = titleResult.data.choices[0]?.message.content || '';
//     const metaDescription =
//       metaDescriptionResult.data.choices[0]?.message.content || '';

//     console.log(postContentResult.data.choices[0]?.message.content);


//     await fetch(`${MONGO_DATA_API_BASE_URL}/action/update`, {
//       method: 'PATCH',
//       headers: headers,
//       body: JSON.stringify({
//         filter: { auth0Id: user.sub },
//         update: { $inc: { availableTokens: -1 } },
//       }),
//     });
    

//     // Insert post in MongoDB Data API
//     const postResponse = await fetch(
//       `${MONGO_DATA_API_BASE_URL}/action/insertOne`,
//       {
//         method: 'POST',
//         headers: headers,
//         body: JSON.stringify({
//           collection: 'posts',
//           database: 'Content-AI',
//           dataSource: 'Cluster0',
//           document: {
//             postContent: postContent || '',
//             title: title || '',
//             metaDescription: metaDescription || '',
//             topic,
//             keywords,
//             userId: userProfile._id,
//             created: new Date(),
//           },
//         }),
//       }
//     );

//     if (!postResponse.ok) {
//       const postData = await postResponse.json();
//       throw new Error(`Error inserting post: ${postData.error}`);
//     }

//     const postData = await postResponse.json();
//     if (postData.insertedId) {
//       res.status(200).json({
//         postId: postData.insertedId,
//       });
//     } else {
//       throw new Error('Post was not inserted successfully.');
//     }
//   } catch (error) {
//     console.log('Error occurred:', error);
//     res
//       .status(500)
//       .json({ error: 'Internal Server Error', details: error.message });
//   }
// });
