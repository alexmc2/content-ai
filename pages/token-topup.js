import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Layout } from '../components/AppLayout/Layout';
import { getAppProps } from '../utils/getAppProps';

export default function TokenTopup() {
  const handleClick = async () => {
    const result = await fetch(`/api/addTokens`, {
      method: 'POST',
    });

  const json = await result.json();
  console.log('RESULT: ', json);
  window.location.href = json.session.url;
  };
  
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 border my-8 rounded-md mx-8 w-full max-w-xl">
        <h1>this is the token topup</h1>
        <button className="btn" onClick={handleClick}>
          Add tokens
        </button>
      </div>
    </div>
  );
}

TokenTopup.getLayout = function getLayout(page, pageProps) {
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


