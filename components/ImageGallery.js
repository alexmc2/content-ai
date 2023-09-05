import React, { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import 'yet-another-react-lightbox/styles.css';
import Image from 'next/image';

const ImageGallery = ({ images }) => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState('');

  const galleryTab = images.map((img) => ({
    imageUrl: img.imageUrl,
  }));
  const slides = images.map((item) => ({
    src: item.imageUrl,
    width: 1000, // or any other standard value
    height: 1000, // same as width since they are square
  }));

  return (
    <div className="w-full">
      <div className="flex flex-col md:grid md:grid-cols-3 h-full gap-6 flex-wrap mx-2 md:mx-0">
        {galleryTab.map((x, index) => {
          return (
            <div key={index}>
              <div className="group h-full">
                <Image
                  src={x.imageUrl}
                  alt="Gallery Item"
                 
                  layout="responsive"
                  width={500}
                  height={500}
                  onClick={() => {
                    setOpen(true);
                    setImage(x.imageUrl);
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        plugins={[Zoom]}
        showPrevNext={false}
        slides={slides}
      />
    </div>
  );
};

export default ImageGallery;
