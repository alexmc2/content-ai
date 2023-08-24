import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Layout } from '../components/AppLayout/Layout';
import { getAppProps } from '../utils/getAppProps';

export default function Success() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-slate-800 to-sky-700">
      <div className="text-white text-6xl ">Thank you for your purchase</div>
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
