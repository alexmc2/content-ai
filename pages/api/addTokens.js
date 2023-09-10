import { getSession } from '@auth0/nextjs-auth0';
import client from '../../utils/paypal';
import paypal from '@paypal/checkout-server-sdk';
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  const session = await getSession(req, res);
  const userId = session.user.sub;

  const PaypalClient = client();

  const request = new paypal.orders.OrdersCreateRequest();
  request.headers['prefer'] = 'return=representation';
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: '10', // The amount for token purchase
        },
        description: 'Token Top-up',
        custom_id: userId, // Storing user ID in custom_id for reference
      },
    ],
  });

  try {
    const response = await PaypalClient.execute(request);
    if (response.statusCode !== 201) {
      console.error('Error creating PayPal order:', response);
      return res.status(500).json({ error: 'Failed to create PayPal order' });
    }

    // Store the order in your MongoDB database if needed
    const client = await clientPromise;
    const db = client.db('Content-AI');
    const ordersCollection = db.collection('orders');
    const order = {
      orderID: response.result.id,
      userID: userId,
      status: 'CREATED',
      amount: 10, // The amount for token purchase
 
    };
    await ordersCollection.insertOne(order);

    const usersCollection = db.collection('users');
    await usersCollection.updateOne(
      { auth0Id: userId },
      { $inc: { availableTokens: 10 } } // Increment availableTokens by 10
    );

    res.status(200).json({ orderID: response.result.id });
  } catch (error) {
    console.error('Error in /api/addTokens:', error);
    res
      .status(500)
      .json({ error: 'Internal Server Error', details: error.message });
  }
}
