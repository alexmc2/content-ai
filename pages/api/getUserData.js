import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import clientPromise from '../../lib/mongodb';

const getUserData = async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required.' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('Content-AI');
    const user = await db.collection('users').findOne({ auth0Id: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Return only the necessary data to the client
    const { availableTokens, email, name, nickname, picture } = user;
    res.status(200).json({ availableTokens, email, name, nickname, picture });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error.' });
  }
};

export default withApiAuthRequired(getUserData);
