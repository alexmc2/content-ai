import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { Configuration, OpenAIApi } from 'openai';
import clientPromise from '../../lib/mongodb';
import moment from 'moment';

export default withApiAuthRequired(async function handler(req, res) {
  const { user } = await getSession(req, res);
  const client = await clientPromise;
  const db = client.db('Content-AI');
  const userProfile = await db.collection('users').findOne({
    auth0Id: user.sub,
  });

  if (!userProfile?.availableTokens) {
    res.status(403);
    return;
  }

  const postContent = 'This is a mocked post content for testing purposes.';
  const title = 'Mocked Title';
  const metaDescription = 'Mocked meta description for the article.';
  const topic = 'Mocked Topic';
  const keywords = 'Mocked, Keywords';

  // const config = new Configuration({
  //   apiKey: process.env.OPENAI_API_KEY,
  // });
  // const openai = new OpenAIApi(config);

  // const { topic, keywords } = req.body;

  // const postContentResult = await openai.createChatCompletion({
  //   model: 'gpt-3.5-turbo',
  //   messages: [
  //     {
  //       role: 'system',
  //       content: 'You are a content generator.',
  //     },
  //     {
  //       role: 'user',
  //       content: `Write a detailed SEO-friendly article about ${topic}, that targets the following comma-separated keywords: ${keywords}.
  //   The response should be formatted in SEO-friendly HTML,
  //   limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`,
  //     },
  //   ],
  //   temperature: 0,
  // });

  // const postContent = postContentResult.data.choices[0]?.message.content || '';

  // const titleResult = await openai.createChatCompletion({
  //   model: 'gpt-3.5-turbo',
  //   messages: [
  //     {
  //       role: 'system',
  //       content: 'You are a content generator.',
  //     },
  //     {
  //       role: 'user',
  //       content: `Write a detailed SEO-friendly article about ${topic}, that targets the following comma-separated keywords: ${keywords}.
  //   The response should be formatted in SEO-friendly HTML,
  //   limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`,
  //     },
  //     {
  //       role: 'assistant',
  //       content: postContent,
  //     },
  //     {
  //       role: 'user',
  //       content: 'Generate appropriate title tag text for the above article',
  //     },
  //   ],
  //   temperature: 0,
  // });

  // const metaDescriptionResult = await openai.createChatCompletion({
  //   model: 'gpt-3.5-turbo',
  //   messages: [
  //     {
  //       role: 'system',
  //       content: 'You are a content generator.',
  //     },
  //     {
  //       role: 'user',
  //       content: `Write a detailed SEO-friendly article about ${topic}, that targets the following comma-separated keywords: ${keywords}.
  //   The response should be formatted in SEO-friendly HTML,
  //   limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`,
  //     },

  //     {
  //       role: 'assistant',
  //       content: postContent,
  //     },
  //     {
  //       role: 'user',
  //       content:
  //         'Generate SEO-friendly meta description content for the above article',
  //     },
  //   ],
  //   temperature: 0,
  // });

  // const title = titleResult.data.choices[0]?.message.content || '';
  // const metaDescription =
  //   metaDescriptionResult.data.choices[0]?.message.content || '';

  console.log('POST CONTENT: ', postContent);

  console.log('TITLE: ', title);
  console.log('META DESCRIPTION: ', metaDescription);
  // console.log(postContentResult.data.choices[0]?.message.content);

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
  const formattedDate = moment(currentDate).format('MMMM Do YYYY, h:mm:ss a');

  const post = await db.collection('posts').insertOne({
    postContent: postContent || '',
    title: title || '',
    metaDescription: metaDescription || '',
    topic,
    keywords,
    userId: userProfile._id,
    created: formattedDate,
  });

  console.log('POST: ', post);

  res.status(200).json({
    postId: post.insertedId,
  });
});
