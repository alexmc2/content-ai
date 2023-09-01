import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Layout } from '../../components/AppLayout/Layout';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { getAppProps } from '../../utils/getAppProps';
import { Button, Spinner, Card, Textarea, Input} from '@material-tailwind/react';

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
        <div className="text-gray-700 mx-auto">
          <Spinner className="h-16 w-16 text-white mb-6 mx-auto" />
          Generating your article. This may take a few minutes.
        </div>
      ) : (
        <Card className="bg-white/60 p-8 border border-sky-100 my-8 mx-8 w-full prose shadow-none ">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <div className="text-md mb-2 ">
                <div>Describe your topic</div>
              </div>
              
              <Textarea
                className=" border border-sky-100 h-24 w-full py-2 px-3 text-gray-900 bg-white"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                maxLength={150}
              />
            </div>
            <div className="my-4">
              <div className="text-md block mb-2 ">
                <div>Primary keywords</div>
              </div>
              <Input
                className="resize-none border border-sky-100 w-full py-2 px-3 text-gray-900 leading-tight rounded bg-white  "
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                maxLength={150}
              />
            </div>
            <Button
              type="submit"
              className="text-md uppercase w-full bg-blue-900 my-4"
              disabled={!keywords.trim() || !topic.trim()}
            >
              Generate
            </Button>
          </form>
        </Card>
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

    if (!props.availableTokens) {
      return {
        redirect: {
          destination: '/token-topup',
          permanent: false,
        },
      };
    }
    return {
      props,
    };
  },
});
