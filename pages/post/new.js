import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { AppLayout } from '../../components/AppLayout';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function NewPost(props) {
  const router = useRouter();
  const [keywords, setKeywords] = useState('');
  const [topic, setTopic] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <strong>Generate a new aticle on the topic of:</strong>
          </label>
          <textarea
            className="resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            maxLength={80}
          />
        </div>
        <div>
          <label>
            <strong>Targeting the following keywords:</strong>
          </label>
          <textarea
            className="resize-none border border-slate-500 w-full block my-2 px-4 py-2 rounded-sm"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            maxLength={80}
          />
        </div>
        <div></div>
        <button type="submit" className="btn">
          Generate
        </button>
      </form>
    </div>
  );
}

NewPost.getLayout = function getLayout(page, pageProps) {
  return <AppLayout {...pageProps}>{page}</AppLayout>;
};

export const getServerSideProps = withPageAuthRequired(() => {
  return {
    props: {},
  };
});
