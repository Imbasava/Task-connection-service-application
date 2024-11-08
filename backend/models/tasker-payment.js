/* // In routes/booking.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Endpoint to get payment status for a tasker
router.get('/tasker-payments', async (req, res) => {
  const taskerId = req.session.taskerId; // Assuming taskerId is stored in session

  try {
    if (!taskerId) {
      return res.status(400).json({ message: 'Tasker ID is required' });
    }

    const query = `
      SELECT 
        b.booking_id AS bookingId,
        u.firstname AS customerFirstName,
        u.lastname AS customerLastName,
        b.total_amount,
        b.partial_amount,
        (b.total_amount - b.partial_amount) AS balance_amount,
        CASE
          WHEN b.partial_amount = 0 THEN 'Pending'
          WHEN b.partial_amount < b.total_amount THEN 'Partially Paid'
          ELSE 'Paid'
        END AS payment_status
      FROM booking b
      JOIN users u ON b.user_id = u.id
      WHERE b.tasker_id = ?
    `;

    db.query(query, [taskerId], (err, results) => {
      if (err) {
        console.error('Error fetching payment status:', err);
        return res.status(500).json({ message: 'Error fetching payment status', error: err });
      }

      res.status(200).json({ payments: results });
    });
  } catch (error) {
    console.error('Error fetching payment status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
 */


// routes/booking.js
const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Endpoint to get payment status for a tasker
router.get('/tasker-payments/:taskerId', async (req, res) => {
  const { taskerId } = req.params; // Fetch taskerId from URL parameters

  try {
    if (!taskerId) {
      return res.status(400).json({ message: 'Tasker ID is required' });
    }

    const query = `
      SELECT 
        b.booking_id AS bookingId,
        u.firstname AS customerFirstName,
        u.lastname AS customerLastName,
        b.total_amount,
        b.partial_amount,
        (b.total_amount - b.partial_amount) AS balance_amount,
        CASE
          WHEN b.partial_amount = 0 THEN 'Pending'
          WHEN b.partial_amount < b.total_amount THEN 'Partially Paid'
          ELSE 'Paid'
        END AS payment_status
      FROM booking b
      JOIN users u ON b.user_id = u.id
      WHERE b.tasker_id = ?
    `;

    db.query(query, [taskerId], (err, results) => {
      if (err) {
        console.error('Error fetching payment status:', err);
        return res.status(500).json({ message: 'Error fetching payment status', error: err });
      }

      res.status(200).json({ payments: results });
    });
  } catch (error) {
    console.error('Error fetching payment status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
