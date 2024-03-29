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

function getDisplayName(user) {
  if (!user || !user.name) {
    return '';
  }

  // Check if the name is an email
  if (user.name.includes('@')) {
    const [prefix] = user.name.split('@');
    return prefix;
  }

  return user.name;
}

async function populateUserGalleryWithSampleImages(userId) {
  const client = await clientPromise;
  const db = client.db('Content-AI');

  // Fetch all sample images
  const sampleImages = await db.collection('sampleImages').find({}).toArray();

  // Prepare images for insertion: Add userId and remove isSample field
  const imagesToInsert = sampleImages.map((image) => {
    return {
      imageUrl: image.imageUrl,
      prompt: image.prompt,
      userId: userId, // Use the passed userId directly
      created: new Date(),
    };
  });

  // Insert the images into the user's image collection
  await db.collection('images').insertMany(imagesToInsert);
}

export default function HomePage() {
  const { user } = useExtendedUser();
  const displayName = user ? getDisplayName(user) : '';
  if (!user)
    return (
      <Link href="/api/auth/login">
        <div className="text-transparent"> Login </div>
      </Link>
    );

  return (
    <div className="flex justify-center   mx-2 my-5 ">
      <Card className="bg-white/90 px-2 pb-10 flex  border-sky-100 mx-auto max-w-screen-md w-full prose shadow-sm ">
        <CardBody>
          <img
            src="/robot.png"
            alt="Robot Icon"
            className="mx-auto h-16 w-16"
          />
          <Typography variant="h5">Hello, {displayName}!</Typography>
          <Typography className="mb-0">
            Welcome to Content AI - an app for AI-powered text and image
            generation. <br></br>
            <Typography variant="h5">
              <br></br>
              How it works
            </Typography>
            <br></br>
            Content AI harnesses the capabilities of OpenAI&apos;s GPT-3.5-turbo
            model for written content and Stability AI&apos;s powerful new SDXL
            1.0 model for image generation. Click the &apos;New Post&apos; or
            &apos;New Image&apos; buttons to get started. <br></br>
            <br></br>
            The app works on both desktop and mobile devices. On mobile devices,
            you can toggle the sidebar visibility by clicking the blue hamburger
            menu icon in the top right hand corner of the page. <br></br>
            <br></br>
            You can view your generated content by clicking on the history
            button on the sidebar. New posts are automatically saved to your
            document history, and images can be saved by clicking the
            &apos;Save&apos; button immediately after the image has been
            generated. A sample gallery of AI images and prompts can be found in
            your images history.
            <br></br>
            <br></br>
            Your account has been credited with 20 tokens and each document or
            image generated deducts one token. This app is still in development
            and PayPal functionality is implemented in sandbox mode to emulate a
            real app in production. You can acquire more tokens by using the
            test PayPal account on the token top-up page.<br></br>
            <br></br>
            Please be aware that the Open AI API is a bit on the slow side and
            can take around 30 seconds to generate a response. I&apos;m
            currently exploring ways to boost this speed and stream the API
            response (word-by-word) by integrating edge functions into my
            current tech stack. Stay tuned for updates!
            <br></br>
            <br></br>This app was developed as a portfolio practice project and
            your thoughts, feedback, and bug reports are welcome! You can
            contact me at alexandramcgarryx@gmail.com. Thank you for visiting
            and enjoy generating some AI content!
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
      // Insert the new user
      const insertResult = await db.collection('users').insertOne({
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

      // Fetch the inserted user's _id
      const insertedUserId = insertResult.insertedId;

      await populateUserGalleryWithSampleImages(insertedUserId);
    }

    return {
      props: {
        ...props,
      },
    };
  },
});
