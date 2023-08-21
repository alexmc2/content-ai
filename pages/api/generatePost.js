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

  console.log(postContentResult.data.choices[0]?.message.content);
}
