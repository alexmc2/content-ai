import Link from 'next/link';
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { getAppProps } from '../utils/getAppProps';
import clientPromise from '../lib/mongodb';
import { Layout } from '../components/AppLayout/Layout';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
  Button,
} from '@material-tailwind/react';

export default function HomePage({ user }) {
  if (!user)
    return (
      <Link href="/api/auth/login" legacyBehavior>
        <div> Login </div>
      </Link>
    );

  return (
    <div className="flex justify-center  p-4">
      <Card className="max-w-xl w-full mx-auto mb-20 mt-20 ">
        <img src="/background8.webp" alt="card-image" />

        <CardBody>
          <Typography variant="h5" color="blue-gray" className="my-2">
            Hello, {user.name}!
          </Typography>
          <Typography className="sm:text-base text-lg ">
            Your account has been credited with 20 tokens*. Each document or image generated
            deducts one token but you can acquire more on the tokens page. Thank
            you for visiting my app!
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Link href="/post/new" legacyBehavior>
            <Button className="bg-blue-900">New Post</Button>
          </Link>
          <div className="prose text-sm mb-0 mt-8">
            *You may need to refresh the page to activate your tokens.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

HomePage.getLayout = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
    const props = await getAppProps(ctx);
    const { req, res } = ctx;
    const session = await getSession(req, res);
    const user = session?.user;

    if (!user) {
      return {
        props: {},
      };
    }

    const client = await clientPromise;
    const db = client.db('Content-AI');

    let userProfile = await db.collection('users').findOne({
      auth0Id: user.sub,
    });

    if (!userProfile) {
      await db.collection('users').insertOne({
        auth0Id: user.sub,
        email: user.email,
        email_verified: user.email_verified,
        name: user.name,
        nickname: user.nickname,
        picture: user.picture,
        sid: user.sid,
        updated_at: user.updated_at,
        availableTokens: 20,
      });
      userProfile = {
        auth0Id: user.sub,
        email: user.email,
        email_verified: user.email_verified,
        name: user.name,
        nickname: user.nickname,
        picture: user.picture,
        sid: user.sid,
        updated_at: user.updated_at,
        availableTokens: 20,
      };
    }

    // // Convert _id object to string
    // if (userProfile && userProfile._id) {
    //   userProfile._id = userProfile._id.toString();
    // }

    return {
      props: {
        ...props,
      },
    };
  },
});
