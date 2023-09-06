import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Layout } from '../../components/AppLayout/Layout';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { getAppProps } from '../../utils/getAppProps';
import { articlePrompts } from '../../components/ArticlePrompts';
import {
  Button,
  Spinner,
  Card,
  Textarea,
  Input,
} from '@material-tailwind/react';

export default function NewPost(props) {
  const router = useRouter();
  const [keywords, setKeywords] = useState('');
  const [topic, setTopic] = useState('');
  const [loading, setLoading] = useState(false); // New loading state
  const [promptIndex, setPromptIndex] = useState(0);

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

  const setNextPrompt = () => {
    if (promptIndex < articlePrompts.length - 1) {
      setTopic(articlePrompts[promptIndex + 1].title);
      setKeywords(articlePrompts[promptIndex + 1].keywords);
      setPromptIndex(promptIndex + 1);
    } else {
      // Reset to the first prompt if we've reached the end of the array
      setTopic(articlePrompts[0].title);
      setKeywords(articlePrompts[0].keywords);
      setPromptIndex(0);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
    {loading ? (
      <div className="text-gray-700 mx-auto text-center p-6 sm:max-w-screen-md max-w-screen-sm">
        <Spinner className="h-16 w-16 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-18 lg:w-18 text-white mb-4 mx-auto" />
        <p className="text-md sm:text-base md:text-lg px-10">
          Generating your article. This may take a few minutes.
        </p>
      </div>
      ) : (
        <Card className="bg-white/60 p-8 border border-sky-100 mt-8 mx-auto max-w-screen-md flex w-full prose shadow-sm ">
          <form onSubmit={handleSubmit}>
            <div className=" flex flex-col">
            <Button
                className="mb-3 w-52 mt- py-2 text-sm uppercase border border-gray-400 text-gray-600 bg-white hover:shadow-sm shadow-none"
                onClick={setNextPrompt}
              >
                Try an example prompt
              </Button>
              <div className="flex justify-between items-center mb-3 mt-2 text-md">
                <div>Describe your topic</div>
                <div className="text-sm text-gray-600">{topic.length}/250</div>
              </div>
            
              <Textarea
                style={{ fontSize: '1.00rem' }}
                className="bg-white text-2xl border "
                placeholder="Provide the AI with 1-2 sentences describing your topic."
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                maxLength={250}
              />
            </div>
            <div className=" flex flex-col">
              <div className="flex justify-between items-center mb-3 mt-2 text-md">
                <div>Primary keywords</div>
                <div className="text-sm text-gray-600">
                  {keywords.length}/120
                </div>
              </div>
              <Textarea
                style={{ fontSize: '1.00rem' }}
                className="bg-white text-2xl"
                type="text"
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
