import React, { useState } from 'react';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Layout } from '../components/AppLayout/Layout';
import { getAppProps } from '../utils/getAppProps';
import ImageGrid from '../components/ImageGrid';
import ImageModal from '../components/ImageModal';

export default function ImageHistory({ images }) {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div>
      <ImageGrid images={images} setSelectedImg={setSelectedImg} />
      {selectedImg && (
        <ImageModal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
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
