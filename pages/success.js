import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Layout } from '../components/AppLayout/Layout';
import { getAppProps } from '../utils/getAppProps';

export default function Success() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 border my-8 rounded-md mx-8 w-full max-w-xl">
        <h1>Thank you for your purchase</h1>
      </div>
    </div>
  );
}

Success.getLayout = function getLayout(page, pageProps) {
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
