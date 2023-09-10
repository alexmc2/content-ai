import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
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

  const paypalCreateOrder = async () => {
    try {
      let response = await fetch('/api/addTokens', {
        method: 'POST',
      });
      const data = await response.json();
      return data.orderID;
    } catch (err) {
      console.error('Error creating PayPal order:', err);
      return null;
    }
  };

  const paypalCaptureOrder = async (orderID) => {
    try {
      await fetch('/api/paypal/captureOrder', {
        method: 'POST',
        body: JSON.stringify({ orderID }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (err) {
      console.log('Error capturing PayPal order:', err);
    }
  };

  return (
    <PayPalScriptProvider
      options={{
        'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        currency: 'USD',
        intent: 'capture',
      }}
    >
      <div className="flex flex-col justify-center items-center h-screen mx-2">
        <Card className="bg-white p-8 border border-sky-100 mt-8 mx-auto max-w-screen-md flex w-full prose shadow-sm z-0">
          <CardBody>
            {' '}
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
          </CardBody>
          {/* <Typography variant="h5" color="blue-gray" className="mb-2">
              This app is still in development.
            </Typography>
            <Typography>
              You can acquire more tokens by clicking the button below. Real
              money payments are not implemented, but you can use the following test
              account to add 10 tokens to your account. <br> </br> <br></br>
              
              email: sb-d3kyy27040456@personal.example.com <br></br>
              password: NEpul&5N 
            </Typography> */}

          <Typography variant="h5" color="blue-gray" className="mb-2 ">
            This app is still in development.
          </Typography>
          <Typography>
            You can acquire more tokens by clicking the button below. Real money
            payments are not implemented, but you can use the following test
            account to add 10 tokens to your account. <br></br> <br></br>
            <strong>Email:</strong>
            <span style={{ wordBreak: 'break-all' }}>
              {` sb-d3kyy27040456@personal.example.com`}
            </span>
            <br></br>
            <strong>Password:</strong> NEpul&5N
          </Typography>
          {/* </Card>
        <Card className="bg-white/60 p-8 border border-sky-100 mt-8 mx-auto max-w-screen-md flex w-full prose shadow-sm z-0"> */}
          <PayPalButtons
            style={{
              color: 'gold',
              shape: 'rect',
              label: 'pay',
              height: 50,
            }}
            createOrder={paypalCreateOrder}
            onApprove={(data) => paypalCaptureOrder(data.orderID)}
            className='mt-8'
          />
        </Card>
      </div>
    </PayPalScriptProvider>
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
