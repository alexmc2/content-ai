import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { SidebarContext } from '../context/sidebarContext';

function ImageModal({ selectedImg, setSelectedImg }) {
  const { collapsed } = useContext(SidebarContext); // Use the context

  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setSelectedImg(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 backdrop"
      onClick={handleClick}
    >
      <motion.div
        initial={{ y: '-100vh' }}
        animate={{ y: '0' }}
        className="flex max-w-3/5 max-h-4/5 rounded-lg shadow-lg bg-transparent"
      >
        <img src={selectedImg} alt="enlarged pic" className="sm:w-2/3 sm:h-2/3 object-cover mx-auto my-auto border-8 rounded-sm border-white" />
      </motion.div>
    </motion.div>
  );
}

export default ImageModal;
