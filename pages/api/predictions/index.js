import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import clientPromise from '../../../lib/mongodb';

export default withApiAuthRequired(async function handler(req, res) {
  const { user } = await getSession(req, res);
  const client = await clientPromise;
  const db = client.db('Content-AI');
  const userProfile = await db.collection('users').findOne({
    auth0Id: user.sub,
  });

  // Check if the user has enough tokens
  if (userProfile?.availableTokens <= 0) {
    return res.status(403).json({ error: 'No available tokens.' });
  }

  const response = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      version:
        '2b017d9b67edd2ee1401238df49d75da53c523f36e363881e057f5dc3ed3c5b2',
      input: { prompt: req.body.prompt },
    }),
  });

  if (response.status !== 201) {
    let error = await response.json();
    res.statusCode = 500;
    res.end(JSON.stringify({ detail: error.detail }));
    return;
  }

  const prediction = await response.json();

  // Deduct a token after successfully generating the image
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

  res.statusCode = 201;
  res.end(JSON.stringify(prediction));
});
