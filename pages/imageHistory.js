import React, { useState } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Layout } from '../components/AppLayout/Layout';
import { getAppProps } from '../utils/getAppProps';
import ImageGrid from '../components/ImageGrid';
import ImageModal from '../components/ImageModal';
import { ClipboardAlert } from '../components/ClipboardAlert';

export default function ImageHistory({ images }) {
  const [selectedImg, setSelectedImg] = useState(null);
  const [showClipboardAlert, setShowClipboardAlert] = useState(false);

  return (
    <div>
      <h1 className="text-left text-7xl text-gray-500 mx-8 my-20 prose">Image Gallery</h1>
      <ImageGrid images={images} setSelectedImg={setSelectedImg} />
      {selectedImg && (
        <ImageModal
          selectedImg={selectedImg}
          setSelectedImg={setSelectedImg}
          setShowClipboardAlert={setShowClipboardAlert} // Pass the setter function
        />
      )}
      {showClipboardAlert && <ClipboardAlert />}
    </div>
  );
}

ImageHistory.getLayout = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);
    console.log('Server-side images:', props);
    return {
      props,
    };
  },
});
