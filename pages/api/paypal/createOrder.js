import client from '../../utils/paypal';
import paypal from '@paypal/checkout-server-sdk';
import clientPromise from '../../../lib/mongodb';

export default async function Handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(404).json({ success: false, message: 'Not Found' });
  }

  if (!req.body.order_price || !req.body.user_id) {
    return res.status(400).json({
      success: false,
      message: 'Please Provide order_price And User ID',
    });
  }

  try {
    const PaypalClient = client();
    const request = new paypal.orders.OrdersCreateRequest();
    request.headers['prefer'] = 'return=representation';
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: req.body.order_price.toString(),
          },
        },
      ],
    });
    const response = await PaypalClient.execute(request);
    if (response.statusCode !== 201) {
      console.log('RES: ', response);
      return res
        .status(500)
        .json({ success: false, message: 'Some Error Occured at backend' });
    }

    // Store the order in MongoDB
    const client = await clientPromise;
    const db = client.db('Content-AI');
    const ordersCollection = db.collection('orders');
    const order = {
      orderID: response.result.id,
      userID: req.body.user_id,
      status: 'CREATED',
      amount: parseFloat(req.body.order_price),
     
    };
    await ordersCollection.insertOne(order);

    res.status(200).json({ success: true, data: { order: response.result } });
  } catch (err) {
    console.log('Err at Create Order: ', err);
    return res
      .status(500)
      .json({ success: false, message: 'Error creating the order' });
  }
}
