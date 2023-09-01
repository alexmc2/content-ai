import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Layout } from '../components/AppLayout/Layout';
import { getAppProps } from '../utils/getAppProps';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Profile() {
  const { user } = useUser();
  console.log('file: profile.js:8 ~ Profile ~ user :', user )

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 border my-8 rounded-md mx-8 w-full max-w-xl">
        <h1>Profile Page</h1>
      </div>
    </div>
  );
}

Profile.getLayout = function getLayout(page, pageProps) {
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
