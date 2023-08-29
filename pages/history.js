import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Layout } from '../components/AppLayout/Layout';
import clientPromise from '../lib/mongodb';
import Link from 'next/link';
import { getAppProps } from '../utils/getAppProps';

export default function History({ posts, props }) {
  return (
    <div className="overflow-auto h-full m-4">
      <div className="max-w-screen-lg mx-auto py-8">
        <div className="bg-white p-8 border rounded-md">
          {posts.map((post) => (
            <div key={post._id} className="my-4">
              <Link href={`/post/${post._id}`}>
                <div className="text-blue-600 hover:underline">
                  {post.title}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

History.getLayout = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);
    const client = await clientPromise;
    const db = client.db('Content-AI');

    const posts = await db.collection('posts').find().toArray();

    return {
      props: {
        posts: JSON.parse(JSON.stringify(posts)),
        ...props,
      },
    };
  },
});
