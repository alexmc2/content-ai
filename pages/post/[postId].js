import { getSession, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Layout } from '../../components/AppLayout/Layout';
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag } from '@fortawesome/free-solid-svg-icons';
import { getAppProps } from '../../utils/getAppProps';
import { Card } from '@material-tailwind/react';
import moment from 'moment';

export default function Post(props) {
  const [date, time] = props.postCreated.split(',');
  const formattedDate = moment(date).format('MMMM Do YYYY');
  const formattedTime = moment(time).format('h:mm a');
  console.log('props', props);

  return (
    <div className="flex m-2 sm:m-6 h-screen py-2 sm:py-10">
      <div className="sm:max-w-screen-auto max-w-auto mx-auto py-8  ">
        <div className="bg-white sm:px-20 py-10 sm:my-2 my-16 px-8 border rounded-md  ">
          <div className="prose">
            <h1 className="pt-10">{props.title}</h1>

            <p className="pb-10">{props.metaDescription}</p>

            <div
              dangerouslySetInnerHTML={{ __html: props.postContent || '' }}
            />
          </div>
          <div className="flex flex-wrap pt-2 gap-1 pb-2  text-gray-600">
            <div>Keywords:</div>
            {props.keywords.split(',').map((keyword, i, arr) => (
              <span key={i} className="bg-transparent">
                {keyword}
                {i !== arr.length - 1 ? ',' : ''}
              </span>
            ))}
          </div>

          <div>
            <div className=" text-gray-600">
              Generated on {formattedDate} at {formattedTime}
            </div>
          </div>
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
