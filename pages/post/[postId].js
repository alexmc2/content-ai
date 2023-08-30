import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Layout } from '../../components/AppLayout/Layout';
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { getAppProps } from '../../utils/getAppProps';

export default function Post(props) {
  const [date, time] = props.postCreated.split(',');
  console.log('props', props);

  return (
    <div className="flex    h-screen p-4">
      <div className="max-w-screen-lg mx-auto py-8 ">
        <div className="bg-white p-8 border rounded-md ">
          <article className="prose">
            <h2>SEO title and meta description</h2>
            <div className="p-4 my-4 border border-stone-200 rounded-md">
            <div className="text-blue-600 text-2xl font-bold">{props.title}</div>
            </div>
            <p>{props.metaDescription}</p>
            <h2>Keywords</h2>
            <div className="flex flex-wrap pt-2 gap-1">
              {props.keywords.split(',').map((keyword, i) => (
                <span key={i} className="p-2 rounded-full bg-slate-800 text-white">
                  <FontAwesomeIcon icon={faHashtag} /> {keyword}
                </span>
              ))}
            </div>
            <p>Generated on {date} at {time}</p>
            <div dangerouslySetInnerHTML={{ __html: props.postContent || '' }} />
          </article>
        </div>
      </div>
    </div>
  );
}


Post.getLayout = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);

    const userSession = await getSession(ctx.req, ctx.res);
    const client = await clientPromise;
    const db = client.db('Content-AI');
    const user = await db.collection('users').findOne({
      auth0Id: userSession.user.sub,
    });
    const post = await db.collection('posts').findOne({
      _id: new ObjectId(ctx.params.postId),
      userId: user._id,
    });

    if (!post) {
      return {
        redirect: {
          destination: '/post/new',
          permanent: false,
        },
      };
    }
    return {
      props: {
        postContent: post.postContent,
        title: post.title,
        metaDescription: post.metaDescription,
        keywords: post.keywords,
        postCreated: post.created.toString(),
        ...props,
      },
    };
  },
});
