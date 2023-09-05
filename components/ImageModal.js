import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ImageCard } from './ImageCard';

function ImageModal({ selectedImg, setSelectedImg }) {
  const [showClipboardAlert, setShowClipboardAlert] = useState(false);

  const handleClick = (e) => {
    if (e.target.classList.contains('backdrop')) {
      setSelectedImg(null);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(selectedImg.imageUrl);
    setShowClipboardAlert(true);
    setTimeout(() => setShowClipboardAlert(false), 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 flex items-center justify-center backdrop backdrop-filter backdrop-blur-md"
      onClick={handleClick}
    >
      <ImageCard
        imageUrl={selectedImg.imageUrl}
        prompt={selectedImg.prompt}
        onShare={handleShare}
        showClipboardAlert={showClipboardAlert}
      />
    </motion.div>
  );
}

export default ImageModal;
