// components/ImageGrid.js
import React from 'react';
import { motion, MotionConfig } from 'framer-motion';

function ImageGrid({ images, setSelectedImg }) {
  console.log('Inside ImageGrid, images:', images);
  return (
    <div className="grid sm:grid-cols-3 sm:gap-4 grid-cols-1 gap-2">
      {images &&
        images.map((image, index) => (
          <div
            key={index}
            className="relative overflow-hidden aspect-w-1 aspect-h-1 cursor-pointer"
            onClick={() => setSelectedImg(image.imageUrl)}
          >
            <img
              src={image.imageUrl}
              alt="Gallery Image"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
    </div>
  );
}

export default ImageGrid;
