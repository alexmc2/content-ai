import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Layout } from '../components/AppLayout/Layout';
import { getAppProps } from '../utils/getAppProps';
import ImageGallery from '../components/ImageGallery';

export default function ImageHistory({ images }) {
  console.log(images); // Check the images prop
  return <ImageGallery images={images} />;
}

ImageHistory.getLayout = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);
    return {
      props,
    };
  },
});
