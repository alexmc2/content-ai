import { getSession, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { ObjectId } from 'mongodb';
import clientPromise from '../../lib/mongodb';

export default withApiAuthRequired(async function handler(req, res) {
  try {
    const {
      user: { sub },
    } = await getSession(req, res);
    const client = await clientPromise;
    const db = client.db('Content-AI');
    const userProfile = await db.collection('users').findOne({
      auth0Id: sub,
    });

    const { imageId } = req.body; // Get the imageId from the request body


    await db.collection('images').deleteOne({
      userId: userProfile._id,
      _id: new ObjectId(imageId),
    });

    res.status(200).json({ success: true });
  } catch (e) {
    console.error('Error deleting image:', e);
    res.status(500).json({ success: false, message: 'Failed to delete image' });
  }
});
