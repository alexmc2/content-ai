import { v2 as cloudinary } from 'cloudinary';
import { getSession } from '@auth0/nextjs-auth0';
import clientPromise from '../../lib/mongodb';

// ... Cloudinary config ...

const uploadImage = async (req, res) => {
  if (req.method === 'POST') {
    const { user } = await getSession(req, res);
    const client = await clientPromise;
    const db = client.db('Content-AI');
    const userProfile = await db.collection('users').findOne({
      auth0Id: user.sub,
    });

    // Check if user has available tokens
    if (!userProfile?.availableTokens) {
      return res.status(403).json({ error: 'No available tokens.' });
    }

    const { imageUrl } = req.body;

    try {
      const result = await cloudinary.uploader.upload(imageUrl);

      // Deduct a token after successful upload
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

      res.status(200).json({ cloudinaryUrl: result.url });
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      res.status(500).json({ error: 'Failed to upload image to Cloudinary.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
};

export default uploadImage;
