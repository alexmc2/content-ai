// pages/api/saveImage.js

import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import clientPromise from '../../lib/mongodb';

export default withApiAuthRequired(async function saveImage(req, res) {
  const { user } = await getSession(req, res);
  const client = await clientPromise;
  const db = client.db('Content-AI');
  const userProfile = await db.collection('users').findOne({
    auth0Id: user.sub,
  });

  const { imageUrl } = req.body;

  if (!imageUrl) {
    res.status(422).send('Image URL is required.');
    return;
  }

  const currentDate = new Date();

  const image = await db.collection('images').insertOne({
    imageUrl,
    userId: userProfile._id,
    created: currentDate,
  });

  res.status(200).json({
    imageId: image.insertedId,
  });
});
