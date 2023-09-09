import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { ImageCard } from './ImageCard';
import DeleteDialog from './DeleteDialog';
import { ImageDeletedAlert } from './ImageDeletedAlert';
import { ImagesContext } from '../context/imagesContext';

function ImageModal({ selectedImg, setSelectedImg }) {
  const [showClipboardAlert, setShowClipboardAlert] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const { deleteImage } = useContext(ImagesContext);

  const handleClick = (e) => {
    if (e.target === e.currentTarget) {
      setSelectedImg(null);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(selectedImg.imageUrl);
    setShowClipboardAlert(true);
    setTimeout(() => setShowClipboardAlert(false), 4000);
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    await deleteImage(selectedImg._id); //Call deleteImage function here

    setShowDeleteDialog(false);
    setShowDeleteAlert(true);
    setTimeout(() => {
      setShowDeleteAlert(false);
      setSelectedImg(null); // Close modal after deletion
    }, 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 flex items-center justify-center backdrop backdrop-filter backdrop-blur-md"
      onClick={handleClick}
    >
      <div
        className="absolute inset-0 bg-black opacity-20"
        onClick={handleClick}
      ></div>
      <div onClick={(e) => e.stopPropagation()}>
        {/* Prevents the modal from closing when its content is clicked */}
        <ImageCard
          imageUrl={selectedImg.imageUrl}
          prompt={selectedImg.prompt}
          onShare={handleShare}
          onDelete={handleDelete}
          showClipboardAlert={showClipboardAlert}
          showDeleteAlert={showDeleteAlert}
        />
        <DeleteDialog
          open={showDeleteDialog}
          handleClose={() => setShowDeleteDialog(false)}
          handleDeleteConfirm={handleDeleteConfirm}
        />
      </div>
    </motion.div>
  );
}

export default ImageModal;
