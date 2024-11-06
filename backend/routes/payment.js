const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const router = express.Router();

// Initialize Razorpay instance with your keys
const razorpay = new Razorpay({
  key_id: 'rzp_test_KA0MVYPAHSnecF',
  key_secret: 'XUhFhffXlOONKR6w1CEDAhJK',
});


// Endpoint to create a new order
router.post('/create-order', async (req, res) => {
  const { amount, taskerId } = req.body;

  const options = {
    amount: amount, // Amount in paise
    currency: 'INR',
    receipt: `receipt_${taskerId}_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.status(200).json({ orderId: order.id, amount: order.amount });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order' });
  }
});

// Endpoint to verify payment
router.post('/verify', async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

  const hmac = crypto.createHmac('sha256', 'YOUR_RAZORPAY_SECRET');
  hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const generated_signature = hmac.digest('hex');

  if (generated_signature === razorpay_signature) {
    // Store payment success in database if needed
    res.status(200).json({ message: 'Payment verified successfully' });
  } else {
    res.status(400).json({ message: 'Payment verification failed' });
  }
});

module.exports = router;
 