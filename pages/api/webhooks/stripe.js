import Cors from 'micro-cors';
import stripeInit from 'stripe';
import verifyStripe from '@webdeveducation/next-verify-stripe';
import clientPromise from '../../../lib/mongodb';

const cors = Cors({
  allowMethods: ['POST', 'HEAD'],
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = stripeInit(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const handler = async (req, res) => {
  console.log('Webhook received'); // This will let us know if Stripe is hitting our endpoint

  if (req.method === 'POST') {
    let event;
    try {
      event = await verifyStripe({
        req,
        stripe,
        endpointSecret,
      });
      console.log('Stripe verified:', event.type); // This will log the event type
    } catch (e) {
      console.error('Stripe verification failed:', e);
      return res.status(400).send('Webhook Error: Verification failed.');
    }

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object;
      const auth0Id = paymentIntent.metadata.sub;

      const client = await clientPromise;
      const db = client.db('Content-AI');

      try {
        const updateResult = await db.collection('users').updateOne(
          { auth0Id },
          {
            $inc: { availableTokens: 10 },
            $setOnInsert: { auth0Id },
          },
          { upsert: true }
        );
        console.log('Update result:', updateResult); // This will log the result of the update operation
        return res.status(200).json({ received: true });
      } catch (e) {
        console.error('Database update failed:', e);
        return res.status(500).send('Database Error: Update failed.');
      }
    } else {
      console.log('Unhandled event type:', event.type);
      return res.status(400).send('Unhandled event type.');
    }
  }
};

export default cors(handler);
