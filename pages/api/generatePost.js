// import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
// import { Configuration, OpenAIApi } from 'openai';
// import clientPromise from '../../lib/mongodb';
// import moment from 'moment';

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

//   const postContent = `
//   <!DOCTYPE html>
//   <html lang="en">
//   <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>How Amazing Dogs Are</title>
//   </head>
//   <body>
//     <h1>How Amazing Dogs Are</h1>
  
//     <p>Dogs have a rich history and are known for their incredible personalities. There are also various types of dogs, each with its own unique characteristics. Let's explore why dogs are truly amazing creatures.</p>
  
//     <h2>History of Dogs</h2>
  
//     <p>Dogs have been companions to humans for thousands of years. They were domesticated from wolves and have played important roles in various civilizations throughout history. Ancient Egyptians revered dogs and even worshipped a dog-headed god named Anubis. In ancient Greece, dogs were considered loyal and were often depicted in artwork. Dogs have served as hunting partners, herders, and even war dogs. Today, they continue to be beloved pets and working animals.</p>
  
//     <h2>Personality of Dogs</h2>
  
//     <p>Dogs have a wide range of personalities, making them incredibly lovable and unique. They are known for their loyalty, affection, and ability to form deep bonds with their human companions. Dogs are also highly intelligent and trainable, which has made them excellent service animals, search and rescue dogs, and therapy dogs. Their playful nature brings joy and happiness to households, and their protective instincts make them great family pets.</p>
  
//     <h2>Different Types of Dogs</h2>
  
//     <p>There are numerous breeds of dogs, each with its own distinct characteristics. From small toy breeds like Chihuahuas to large working breeds like German Shepherds, there is a dog for every preference and lifestyle. Some breeds are known for their intelligence, such as Border Collies and Poodles, while others are known for their strength and agility, like Siberian Huskies and Greyhounds. Whether you're looking for a companion, a guard dog, or a service animal, there is a dog breed that can fulfill your needs.</p>
  
//     <h3>Popular Dog Breeds</h3>
  
//     <ul>
//       <li>Labrador Retriever</li>
//       <li>Golden Retriever</li>
//       <li>German Shepherd</li>
//       <li>Bulldog</li>
//       <li>Beagle</li>
//       <li>Poodle</li>
//       <li>Boxer</li>
//       <li>Rottweiler</li>
//       <li>Yorkshire Terrier</li>
//       <li>Dachshund</li>
//     </ul>
  
//     <h4>Labrador Retriever</h4>
  
//     <p>The Labrador Retriever is one of the most popular dog breeds due to its friendly and outgoing nature. They are known for their intelligence and versatility, excelling in various roles such as guide dogs, search and rescue dogs, and therapy dogs.</p>
  
//     <h4>Golden Retriever</h4>
  
//     <p>Golden Retrievers are beloved for their gentle and patient temperament. They are highly trainable and make excellent family pets. Their beautiful golden coats and friendly personalities have made them a favorite choice for many dog lovers.</p>
  
//     <h4>German Shepherd</h4>
  
//     <p>German Shepherds are known for their loyalty, intelligence, and versatility. They are often used as police dogs, search and rescue dogs, and service dogs. German Shepherds are highly trainable and make devoted companions.</p>
  
//     <h4>Bulldog</h4>
  
//     <p>Bulldogs have a distinctive appearance with their wrinkled face and sturdy build. Despite their tough exterior, they are known for their gentle and affectionate nature. Bulldogs are great with children and make loyal family pets.</p>
  
//     <h4>Beagle</h4>
  
//     <p>Beagles are small to medium-sized dogs known for their friendly and curious nature. They have a keen sense of smell and are often used as scent detection dogs. Beagles are energetic and make wonderful companions for active individuals or families.</p>
  
//     <h4>Poodle</h4>
  
//     <p>Poodles are highly intelligent and come in different sizes, including standard, miniature, and toy. They are known for their hypoallergenic coats and are often chosen by individuals with allergies. Poodles are versatile and excel in various dog sports and activities.</p>
  
//     <h4>Boxer</h4>
  
//     <p>Boxers are energetic and playful dogs with a strong protective instinct. They are known for their loyalty and make excellent family pets. Boxers are also used as working dogs in roles such as police dogs and therapy dogs.</p>
  
//     <h4>Rottweiler</h4>
  
//     <p>Rottweilers are powerful and confident dogs. They are known for their protective nature and make excellent guard dogs. With proper training and socialization, Rottweilers can be loving and loyal companions.</p>
  
//     <h4>Yorkshire Terrier</h4>
  
//     <p>Yorkshire Terriers, or Yorkies, are small and feisty dogs with big personalities. They are known for their intelligence and make great companions for individuals or families living in apartments or small spaces.</p>
  
//     <h4>Dachshund</h4>
  
//     <p>Dachshunds, also known as wiener dogs, are small dogs with long bodies and short legs. They are known for their playful and lively nature. Dachshunds come in different coat varieties and make charming and affectionate pets.</p>
  
//     <h2>Conclusion</h2>
  
//     <p>Dogs have a fascinating history and possess incredible personalities. With a wide variety of breeds to choose from, there is a dog that can fit into any lifestyle. Whether you're looking for a loyal companion, a working partner, or a family pet, dogs are truly amazing creatures that bring joy, love, and companionship to our lives.</p>
//   </body>
//   </html>
// `;

//   const title = `

// How Amazing Dogs Are: History, Personality, and Different Types of Dogs

// `;

//   const metaDescription = `
// Discover the amazing history, personalities, and different types of dogs. From their ancient origins to their loyal and affectionate nature, dogs have been cherished companions throughout history. Explore the various breeds and their unique characteristics. Find out why dogs are truly incredible creatures that bring joy and companionship to our lives.

// `;

//   const topic = 'The joys of visiting the Metropolitan Museum of Art';
//   const keywords = 'garden, park, museum, art, history, culture';

//   const config = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY,
//   });
//   const openai = new OpenAIApi(config);

//   const { topic, keywords } = req.body;

//   const postContentResult = await openai.createChatCompletion({
//     model: 'gpt-3.5-turbo',
//     messages: [
//       {
//         role: 'system',
//         content: 'You are a content generator of blogs, post and articles.',
//       },
//       {
//         role: 'user',
//         content: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}.
//     The response should be formatted in SEO-friendly HTML,
//     limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`,
//       },
//     ],
//     temperature: 0.5,
//   });

//   const postContent = postContentResult.data.choices[0]?.message.content || '';

//   const titleResult = await openai.createChatCompletion({
//     model: 'gpt-3.5-turbo',
//     messages: [
//       {
//         role: 'system',
//         content: 'You are a content generator.',
//       },
//       {
//         role: 'user',
//         content: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}.
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
//     temperature: 0.5,
//   });

//   const metaDescriptionResult = await openai.createChatCompletion({
//     model: 'gpt-3.5-turbo',
//     messages: [
//       {
//         role: 'system',
//         content: 'You are a content generator.',
//       },
//       {
//         role: 'user',
//         content: `Write a long and detailed detailed SEO-friendly article about ${topic}, that targets the following comma-separated keywords: ${keywords}.
//     The response should be formatted in SEO-friendly HTML,
//     limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol. `,
//       },

//       {
//         role: 'assistant',
//         content: postContent,
//       },
//       {
//         role: 'user',
//         content:
//           'Generate appropriate description text for the above post',
//       },
//     ],
//     temperature: 0.5,
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
//   const formattedDate = moment(currentDate).format('MMMM Do YYYY, h:mm a');

//   const post = await db.collection('posts').insertOne({
//     postContent: postContent || '',
//     title: title || '',
//     metaDescription: metaDescription || '',
//     topic,
//     keywords,
//     userId: userProfile._id,
//     created: formattedDate,
//   });

//   console.log('POST: ', post);

//   res.status(200).json({
//     postId: post.insertedId,
//   });
// });


import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { Configuration, OpenAIApi } from 'openai';
import clientPromise from '../../lib/mongodb';

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

  const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(config);

  const { topic, keywords } = req.body;

  if (!topic || !keywords) {
    res.status(422);
    return;
  }

  if (topic.length > 80 || keywords.length > 80) {
    res.status(422);
    return;
  }

  /*const response = await openai.createCompletion({
    model: 'text-davinci-003',
    temperature: 0,
    max_tokens: 3600,
    prompt: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}.
    The content should be formatted in SEO-friendly HTML.
    The response must also include appropriate HTML title and meta description content.
    The return format must be stringified JSON in the following format:
    {
      "postContent": post content here
      "title": title goes here
      "metaDescription": meta description goes here
    }`,
  });*/

  const postContentResult = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are a blog post generator.',
      },
      {
        role: 'user',
        content: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}. 
      The response should be formatted in SEO-friendly HTML, 
      limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`,
      },
    ],
    temperature: 0,
  });

  const postContent = postContentResult.data.choices[0]?.message.content;

  const titleResult = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are a blog post generator.',
      },
      {
        role: 'user',
        content: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}. 
      The response should be formatted in SEO-friendly HTML, 
      limited to the following HTML tags: p, h1, h2, h3, h4, h5, h6, strong, i, ul, li, ol.`,
      },
      {
        role: 'assistant',
        content: postContent,
      },
      {
        role: 'user',
        content: 'Generate appropriate title tag text for the above blog post',
      },
    ],
    temperature: 0,
  });

  const metaDescriptionResult = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'You are a blog post generator.',
      },
      {
        role: 'user',
        content: `Write a long and detailed SEO-friendly blog post about ${topic}, that targets the following comma-separated keywords: ${keywords}. 
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
          'Generate SEO-friendly meta description content for the above blog post',
      },
    ],
    temperature: 0,
  });

  const title = titleResult.data.choices[0]?.message.content;
  const metaDescription =
    metaDescriptionResult.data.choices[0]?.message.content;

  console.log('POST CONTENT: ', postContent);
  console.log('TITLE: ', title);
  console.log('META DESCRIPTION: ', metaDescription);

//   await db.collection('users').updateOne(
//   {
//     auth0Id: user.sub,
//   },
//   {
//     $inc: {
//       availableTokens: 20,
//     },
//   }
// );

  const post = await db.collection('posts').insertOne({
    postContent: postContent || '',
    title: title || '',
    metaDescription: metaDescription || '',
    topic,
    keywords,
    userId: userProfile._id,
    created: new Date(),
  });

  res.status(200).json({
    postId: post.insertedId,
  });
});