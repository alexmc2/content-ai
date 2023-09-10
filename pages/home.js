import Link from 'next/link';
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import { getAppProps } from '../utils/getAppProps';
import clientPromise from '../lib/mongodb';
import { useExtendedUser } from '../context/userContext';
import { Layout } from '../components/AppLayout/Layout';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';
import { PhotoIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

export default function HomePage() {
  const { user } = useExtendedUser();
  if (!user)
    return (
      <Link href="/api/auth/login">
        <div> Login </div>
      </Link>
    );

  return (
    <div className="flex justify-center items-center h-screen mx-2 my-5 ">
      <Card className="bg-white/90 px-2 pb-10 flex  border-sky-100 mx-auto max-w-screen-md w-full prose shadow-sm ">
        <CardBody>
          <img
            src="/robot.png"
            alt="Robot Icon"
            className="mx-auto h-16 w-16"
          />
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Hello, {user.name}!
          </Typography>
          <Typography className="mb-0">
            Welcome to Vertex AI. Your account has been credited with 20 tokens.
            Each document or image generated deducts one token but you can
            acquire more on the tokens page. <br></br>
            <br></br>This app was developed as a portfolio practice project and
            your thoughts, feedback, and bug reports are welcome! You can
            contact me at alex_mcgarry@hotmail.com or WhatsApp on 07793 565 433.
            Thank you for visiting and enjoy generating some AI content!
          </Typography>
        </CardBody>
        <div className="flex mt-1 gap-3 px-6">
          <Link href="/post/new" legacyBehavior>
            <Button className="flex-1 gap-1 sm:text-sm text-xs flex items-center justify-center bg-blue-900 ">
              <PencilSquareIcon className="w-5 -h-5 hide-on-mobile" />
              New Post
            </Button>
          </Link>

          <Link href="/post/image" legacyBehavior>
            <Button className="flex-1 gap-1 sm:text-sm text-xs flex items-center justify-center ">
              <PhotoIcon className="w-5 -h-5 hide-on-mobile " />
              New Image
            </Button>
          </Link>
        </div>
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
        username: user.username,
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
        username: user.username,
        email_verified: user.email_verified,
        name: user.name,
        nickname: user.nickname,
        picture: user.picture,
        sid: user.sid,
        updated_at: user.updated_at,
        availableTokens: 20,
      };
    }

    return {
      props: {
        ...props,
      },
    };
  },
});
