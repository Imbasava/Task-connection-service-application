/* // routes/booking.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Your database connection

// Endpoint to create a booking
router.post('/create-booking', async (req, res) => {
  const { taskerId, hours } = req.body;
  const userId = req.session.userId; // Assuming user ID is stored in session storage on login

  // Calculate total and partial amounts
  const ratePerHour = 50000; // Example rate in paise (₹500.00)
  const totalAmount = hours * ratePerHour;
  const partialAmount = totalAmount / 2;

  try {
    const [result] = await db.query(
      `INSERT INTO Booking (tasker_id, user_id, total_amount, partial_amount, payment_time)
       VALUES (?, ?, ?, ?, NOW())`,
      [taskerId, userId, totalAmount, partialAmount]
    );

    res.status(201).json({
      bookingId: result.insertId,
      message: 'Booking created successfully',
      totalAmount,
      partialAmount
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
  */
// bookingController.js
/* 
const db = require('../db');  // Assume db connection is established
const crypto = require('crypto');

exports.paymentVerification = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, taskerId, totalAmount, partialAmount, hours } = req.body;
    const userId = req.session.userId;  // Assuming userId is stored in session

    const isPaymentValid = verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature);

    if (isPaymentValid) {
      const paymentTime = new Date();

      // Insert booking record into database
      await db.query(
        `INSERT INTO booking (tasker_id, user_id, total_amount, partial_amount, payment_time, hours) VALUES (?, ?, ?, ?, ?, ?)`,
        [taskerId, userId, totalAmount / 100, partialAmount / 100, paymentTime, hours]
      );

      res.json({ success: true, message: 'Booking saved successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid payment' });
    }
  } catch (error) {
    console.error('Error in payment verification:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

function verifyPayment(orderId, paymentId, signature) {
  const body = orderId + "|" + paymentId;
  const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
                                   .update(body.toString())
                                   .digest('hex');
  return expectedSignature === signature;
} */

/* 
const express = require('express');
const router = express.Router();
const db = require('../config/db');  // Database connection
const crypto = require('crypto');

// Endpoint to handle payment verification and save booking details
router.post('/payment-verification', async (req, res) => {
  try {
    const { 
      razorpay_payment_id, 
      razorpay_order_id, 
      razorpay_signature, 
      taskerId, 
      userId,
      totalAmount, 
      partialAmount, 
      startDate, 
      endDate, 
      startTime, 
      endTime, 
      totalHours 
    } = req.body;
    
    //const userId = req.session.userId;  // Get userId from session

    // Verify payment signature
    const isPaymentValid = verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature);

    if (isPaymentValid) {
      // Save booking details in the Booking table
      await db.query(
        `INSERT INTO booking (tasker_id, user_id, total_amount, partial_amount, start_date, end_date, start_time, end_time, total_hours)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [taskerId, userId, totalAmount, partialAmount, startDate, endDate, startTime, endTime, totalHours]
      );

      res.json({ success: true, message: 'Booking details saved successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid payment' });
    }
  } catch (error) {
    console.error('Error saving booking details:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Function to verify payment signature
function verifyPayment(orderId, paymentId, signature) {
  const body = orderId + "|" + paymentId;
  const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET)
                                  .update(body.toString())
                                  .digest('hex');
  return expectedSignature === signature;
}

module.exports = router;
 */
/* 
// routes/booking.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Your database connection
const crypto = require('crypto');

// Endpoint to verify payment and store booking details
router.post('/payment-verification', async (req, res) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    taskerId,
    userId,
    totalAmount,
    partialAmount,
    startDate,
    endDate,
    startTime,
    endTime,
    totalHours,
  } = req.body;

  //const userId = req.session.userId; // Assuming user ID is stored in session

  try {
    // Verify the Razorpay payment signature
    const isPaymentValid = verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature);

    if (isPaymentValid) {
      const paymentTime = new Date();

      // Insert booking record into the database
      await db.query(
        `INSERT INTO booking (tasker_id, user_id, total_amount, partial_amount, start_date, end_date, start_time, end_time, total_hours, payment_time)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          taskerId,
          userId,
          totalAmount / 100,  // Convert from paise to rupees
          partialAmount / 100,  // Convert from paise to rupees
          startDate,
          endDate,
          startTime,
          endTime,
          totalHours,
          paymentTime,
        ]
      );

      res.status(200).json({ success: true, message: 'Booking saved successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid payment' });
    }
  } catch (error) {
    console.error('Error in payment verification:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Function to verify the Razorpay payment signature
function verifyPayment(orderId, paymentId, signature) {
  const body = orderId + "|" + paymentId;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)  // Use your secret key from .env
    .update(body.toString())
    .digest('hex');

  return expectedSignature === signature;
}

module.exports = router;
 */
/* 
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Your database connection
const crypto = require('crypto');

// Endpoint to verify payment and store booking details
router.post('/payment-verification', async (req, res) => {
  const {
    razorpay_payment_id,  // Only receiving the Razorpay payment ID
    taskerId,
    userId,
    totalAmount,
    partialAmount,
    startDate,
    endDate,
    startTime,
    endTime,
    totalHours,
  } = req.body;

  try {
    // Verify the Razorpay payment signature using only the payment ID
    const isPaymentValid = verifyPayment(razorpay_payment_id);

    if (isPaymentValid) {
      const paymentTime = new Date();

      // Insert booking record into the database
      await db.query(
        `INSERT INTO booking (tasker_id, user_id, total_amount, partial_amount, start_date, end_date, start_time, end_time, total_hours, payment_time)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          taskerId,
          userId,
          totalAmount / 100,  // Convert from paise to rupees
          partialAmount / 100,  // Convert from paise to rupees
          startDate,
          endDate,
          startTime,
          endTime,
          totalHours,
          paymentTime,
        ]
      );

      res.status(200).json({ success: true, message: 'Booking saved successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid payment' });
    }
  } catch (error) {
    console.error('Error in payment verification:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Function to verify the Razorpay payment signature using the payment ID
function verifyPayment(paymentId) {
  const body = paymentId;
  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)  // Use your secret key from .env
    .update(body.toString())
    .digest('hex');

  // Here, you can send the expected signature to verify it on the frontend if required
  return expectedSignature === paymentId;  // You might have to adjust this logic based on Razorpay's process
}

module.exports = router;
 */
/* 
//working

const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Your database connection
const crypto = require('crypto');

// Endpoint to verify payment and store booking details
router.post('/payment-verification', async (req, res) => {
  const {
    razorpay_payment_id,  // Razorpay payment ID
    taskerId,
    userId,
    totalAmount,
    partialAmount,
    startDate,
    endDate,
    startTime,
    endTime,
    totalHours,
  } = req.body;

  console.log("Received Payment Info:", req.body); // Log received data

  try {
    // In test mode, we can skip the signature verification
    // Simulate a successful payment and save the booking
    const paymentTime = new Date();

    // Insert booking record into the database
    await db.query(
      `INSERT INTO booking (tasker_id, user_id, total_amount, partial_amount, start_date, end_date, start_time, end_time, total_hours, payment_time)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        taskerId,
        userId,
        totalAmount / 100,  // Convert from paise to rupees
        partialAmount / 100,  // Convert from paise to rupees
        startDate,
        endDate,
        startTime,
        endTime,
        totalHours,
        paymentTime,
      ]
    );

    res.status(200).json({ success: true, message: 'Booking saved successfully (simulated payment)' });
  } catch (error) {
    console.error('Error in payment verification:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
 */

/* 
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Your database connection
const crypto = require('crypto');

// Endpoint to verify payment and store booking details
router.post('/payment-verification', async (req, res) => {
  const {
    razorpay_payment_id,
    taskerId,
    userId,
    totalAmount,
    partialAmount,
    startDate,
    endDate,
    startTime,
    endTime,
    totalHours,
  } = req.body;

  console.log("Received Payment Info:", req.body); // Log received data

  try {
    // Simulate a successful payment
    const paymentTime = new Date();
    
    // Log the values being inserted into the database
    console.log("Inserting into database:", [
      taskerId,
      userId,
      totalAmount / 100,  // Convert from paise to rupees
      partialAmount / 100,  // Convert from paise to rupees
      startDate,
      endDate,
      startTime,
      endTime,
      totalHours,
      paymentTime,
    ]);

    // Insert booking record into the database
    const result = await db.query(
      `INSERT INTO booking (tasker_id, user_id, total_amount, partial_amount, start_date, end_date, start_time, end_time, total_hours)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        taskerId,
        parseInt(userId),  // Ensure userId is an integer
        totalAmount / 100,  // Convert to rupees
        partialAmount / 100,  // Convert to rupees
        startDate,  // YYYY-MM-DD format
        endDate,  // YYYY-MM-DD format
        startTime,  // 'HH:mm' format
        endTime,  // 'HH:mm' format
        totalHours // Format payment time to ISO string
      ]
    );
    

    // Log the result of the query
    console.log("Database Query Result:", result);

    // Send success response
    res.status(200).json({ success: true, message: 'Booking saved successfully (simulated payment)' });
  } catch (error) {
    console.error('Error in payment verification:', error); // Log the error
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
 */
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Endpoint to verify payment and store booking details
router.post('/payment-verification', async (req, res) => {
  const {
    razorpay_payment_id,
    taskerId,
    userId,
    totalAmount,
    partialAmount,
    startDate,
    endDate,
    startTime,
    endTime,
    totalHours,
  } = req.body;

  try {
    const isPaymentValid = razorpay_payment_id ? true : false;

    if (isPaymentValid) {
      const query = `
        INSERT INTO booking (
          tasker_id, 
          user_id, 
          total_amount, 
          partial_amount, 
          start_date, 
          end_date, 
          start_time, 
          end_time, 
          total_hours
        ) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

      const values = [
        taskerId,
        parseInt(userId),
        totalAmount,
        partialAmount,
        startDate,
        endDate,
        startTime,
        endTime,
        totalHours,
      ];

      db.query(query, values, (err, results) => {
        if (err) {
          return res.status(500).json({ message: 'Error saving booking', error: err });
        }

        res.status(200).json({ success: true, message: 'Booking saved successfully' });
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid payment' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
