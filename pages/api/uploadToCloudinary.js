// pages/api/uploadToCloudinary.js

import { v2 as cloudinary } from 'cloudinary';

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (req, res) => {
  console.log('Request method:', req.method); // This will log the request method

  if (req.method === 'POST') {
    const { imageUrl } = req.body;

    try {
      const result = await cloudinary.uploader.upload(imageUrl);

      res.status(200).json({ cloudinaryUrl: result.url });
    } catch (error) {
      console.error('Cloudinary upload error:', error); // This will log any Cloudinary errors
      res.status(500).json({ error: 'Failed to upload image to Cloudinary.' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed.' });
  }
};

export default uploadImage;
