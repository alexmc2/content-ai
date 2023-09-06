import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { Layout } from '../components/AppLayout/Layout';
import { getAppProps } from '../utils/getAppProps';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';

export default function TokenTopup() {
  const handleClick = async () => {
    const result = await fetch(`/api/addTokens`, {
      method: 'POST',
    });
    const json = await result.json();
    console.log('RESULT: ', json);
    window.location.href = json.session.url;
  };

  return (
    <div className="flex justify-center items-center h-screen mx-2">
      <Card className="bg-white/60 p-8 border border-sky-100 mt-8 mx-auto max-w-screen-md flex w-full prose shadow-sm ">
        <CardBody>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mb-4 h-12 w-12 text-gray-900"
          >
            <path
              fillRule="evenodd"
              d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
              clipRule="evenodd"
            />
            <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
          </svg>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            This app is still in development.
          </Typography>
          <Typography>
            You can acquire more tokens by clicking the button below. Real money
            payments are not implemented, but you can use the test card number
            4242 4242 4242 4242 with any future expiration date and any CVC to
            add 10 tokens to your account.
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <a href="#" className="inline-block">
            <Button className="" onClick={handleClick}>
              Add tokens
            </Button>
          </a>
        </CardFooter>
      </Card>
    </div>
  );
}

TokenTopup.getLayout = function getLayout(page, pageProps) {
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
