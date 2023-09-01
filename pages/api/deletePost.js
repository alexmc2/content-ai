import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default withPageAuthRequired(async function deletePost(req, res) {
  try {
    const {
      user: { sub },
    } = await getSession(req, res);

    const client = await clientPromise;
    const db = await client.db('Content-AI');
    const userProfile = await db.collection('users').findOne({
      auth0Id: sub,
    });

    const { postId } = req.body;

    await db.collection('posts').deleteOne({
      userId: userProfile._id,
      _id: new ObjectId(postId),
    });

    res.status(200).json({ success: true });
  } catch (e) {
    console.log('An error occurred!:', e);
  }
  return;
});
