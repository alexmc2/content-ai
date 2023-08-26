import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Layout } from '../../components/AppLayout/Layout';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { getAppProps } from '../../utils/getAppProps';
import { Button, Spinner } from '@material-tailwind/react';

export default function NewPost(props) {
  const router = useRouter();
  const [keywords, setKeywords] = useState('');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false); // New loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    const response = await fetch(`/api/generatePost`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ topic, keywords }),
    });
    const json = await response.json();
    console.log('response: ', json);
    if (json.postId) {
      router.push(`/post/${json.postId}`);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {loading ? (
        <div className="text-white ">
          <Spinner className="h-16 w-16 text-white mb-4 " />
          Generating...
        </div>
      ) : (
        <div className="bg-white p-8 border my-8 rounded-md mx-8 w-full max-w-xl">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-gray-700 text-md block mb-2">
                <strong>Generate a new article on the topic of:</strong>
              </label>
              <textarea
                className="resize-none border w-full py-2 px-3 text-gray-700 leading-tight rounded"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                maxLength={120}
              />
            </div>
            <div className="mb-4">
              <label className="text-gray-700 text-md block mb-2">
                <strong>Targeting the following keywords:</strong>
              </label>
              <textarea
                className="resize-none border w-full py-2 px-3 text-gray-700 leading-tight rounded"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                maxLength={120}
              />
            </div>
            <Button
              type="submit"
              color="green"
              className="text-md uppercase w-full"
            >
              Generate
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}

NewPost.getLayout = function getLayout(page, pageProps) {
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
