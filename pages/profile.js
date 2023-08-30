import Link from 'next/link';
import { withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
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

export default function Profile({ user }) {
  if (!user)
    return (
      <Link href="/api/auth/login">
        <div> Login </div>
      </Link>
    );

  return (
    <div className="flex justify-center items-center h-screen p-3">
      <Card className=" w-1/2 h-fit ">
        <CardHeader color="blue-gray" className="relative h-fit">
          <img src="/background7.webp" alt="card-image" />
        </CardHeader>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Hello {user.name}
          </Typography>
          <Typography>What are you going to generate today?</Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Link href="/post/new">
            <Button className="bg-blue-900">New Post</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

Profile.getLayout = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(ctx) {
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
        availableTokens: 10,
      });
      userProfile = { auth0Id: user.sub, availableTokens: 10 };
    }

    // Convert _id to string
    userProfile._id = userProfile._id.toString();

    return {
      props: {
        user: userProfile,
      },
    };
  },
});
