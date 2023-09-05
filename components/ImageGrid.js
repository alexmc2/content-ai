import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@material-tailwind/react';


function ImageGrid({ images, setSelectedImg }) {
  return (
   
    <div className="grid sm:grid-cols-3 sm:gap-4 grid-cols-1 gap-2 m-8">
      {' '}
      {/* Added m-8 for margin */}
      {images &&
        images.map((image, index) => (
          <motion.div
            layout
            whileHover={{ opacity: 1, scale: 1.01 }}
            className="relative overflow-hidden aspect-w-1 aspect-h-1 cursor-pointer transition-transform duration-300 ease-in-out"
            key={index}
            onClick={() => setSelectedImg(image.imageUrl)}
          >
            <motion.img
              src={image.imageUrl}
              alt="Gallery Image"
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
          </motion.div>
        ))}
    </div>
   
  );
}

export default ImageGrid;
