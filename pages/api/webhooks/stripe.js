import Cors from 'micro-cors';
import stripeInit from 'stripe';
import verifyStripe from '@webdeveducation/next-verify-stripe';
import clientPromise from '../../../lib/mongodb';

const cors = Cors({
  allowMethods: ['POST', 'GET', 'HEAD'],
});

export const config = {
  api: {
    bodyParser: false,
  },
};


console.log("Stripe Secret Key:", process.env.STRIPE_SECRET_KEY);
const stripe = stripeInit(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const handler = async (req, res) => {
  if (req.method === 'POST') {
    let event;
    try {
      event = await verifyStripe({
        req,
        stripe,
        endpointSecret,
      });
    } catch (error) {
      console.log('ERROR: ', error);
    }

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const client = await clientPromise;
        const db = client.db('Content-AI');

        const paymentIntent = event.data.object;
        const auth0Id = paymentIntent.metadata.sub;

        console.log('AUTH 0 ID: ', paymentIntent);

        const userProfile = await db.collection('users').updateOne(
          {
            auth0Id,
          },
          {
            $inc: {
              availableTokens: 10,
            },
            $setOnInsert: {
              auth0Id,
            },
          },
          {
            upsert: true,
          }
        );
      }
      default:
        console.log('UNHANDLED EVENT: ', event.type);
    }
    res.status(200).json({ received: true });
  }
};

export default cors(handler);
