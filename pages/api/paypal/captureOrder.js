import client from '../../../utils/paypal';
import paypal from '@paypal/checkout-server-sdk';
import clientPromise from '../../../lib/mongodb';

export default async function Handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(404).json({ success: false, message: 'Not Found' });
  }

  if (!req.body.orderID) {
    return res
      .status(400)
      .json({ success: false, message: 'Please Provide Order ID' });
  }

  // Capture order to complete payment
  const { orderID } = req.body;
  const PaypalClient = client();
  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    const response = await PaypalClient.execute(request);
    if (!response) {
      return res
        .status(500)
        .json({ success: false, message: 'Some Error Occured at backend' });
    }

    // Update the order status in MongoDB
    const client = await clientPromise;
    const db = client.db('Content-AI');
    const ordersCollection = db.collection('orders');
    await ordersCollection.updateOne(
      { orderID: orderID },
      { $set: { status: 'CAPTURED', captureDetails: response.result } }
    );



    res.status(200).json({ success: true, data: { order: response.result } });
  } catch (err) {
    console.log('Err at Capture Order: ', err);
    return res
      .status(500)
      .json({ success: false, message: 'Error capturing the order' });
  }
}
