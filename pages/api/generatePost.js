import { Configuration, OpenAIApi } from 'openai';

export default async function handler(req, res) {
  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(config);

  const { topic, keywords } = req.body;

  const postContentResult = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are a content generator.',
      },
      {
        role: 'user',
        content: `Write a detailed SEO-friendly article about ${topic}, that targets the following comma-separated keywords: ${keywords}. 
    The response should be formatted in SEO-friendly HTML, 
    limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`,
      },
    ],
    temperature: 0,
  });

  const postContent = postContentResult.data.choices[0]?.message.content || '';

  const titleResult = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are a content generator.',
      },
      {
        role: 'user',
        content: `Write a detailed SEO-friendly article about ${topic}, that targets the following comma-separated keywords: ${keywords}. 
    The response should be formatted in SEO-friendly HTML, 
    limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`,
      },
      {
        role: 'assistant',
        content: postContent,
      },
      {
        role: 'user',
        content: 'Generate appropriate title tag text for the above article',
      },
    ],
    temperature: 0,
  });

  const metaDescriptionResult = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are a content generator.',
      },
      {
        role: 'user',
        content: `Write a detailed SEO-friendly article about ${topic}, that targets the following comma-separated keywords: ${keywords}. 
    The response should be formatted in SEO-friendly HTML, 
    limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`,
      },

      {
        role: 'assistant',
        content: postContent,
      },
      {
        role: 'user',
        content:
          'Generate SEO-friendly meta description content for the above article',
      },
    ],
    temperature: 0,
  });

  const title = titleResult.data.choices[0]?.message.content || '';
  const metaDescription =
    metaDescriptionResult.data.choices[0]?.message.content || '';

  console.log('POST CONTENT: ', postContent);
  console.log('TITLE: ', title);
  console.log('META DESCRIPTION: ', metaDescription);
  console.log(postContentResult.data.choices[0]?.message.content);

  res.status(200).json({
    post: {
      postContent,
      title,
      metaDescription,
    },
  });
}
