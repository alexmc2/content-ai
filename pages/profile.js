// pages/profile.js
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Layout } from '../components/AppLayout/Layout';
import { getAppProps } from '../utils/getAppProps';
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
  Button,
} from '@material-tailwind/react';

export default function Profile() {
  const { user, error, isLoading } = useUser();

  console.log('Error:', error);
  console.log('User:', user);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
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
            Hello {user.name},{' '}
          </Typography>
          <Typography>What are you going to generate today?</Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Link href="/post/new">
            <Button className='bg-blue-900'>New Post</Button>
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
    const props = await getAppProps(ctx);
    return {
      props,
    };
  },
});
