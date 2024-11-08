/* const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Endpoint to fetch user role based on userId from session or query
router.get('/get-user-role', (req, res) => {
    const userId = req.query.userId;

    // If no userId is available, return a JSON error message
    if (!userId) {
        return res.status(400).json({ success: false, message: 'User is not logged in. Please log in first.' });
    }

    // Query to fetch user role from the database
    const query = 'SELECT role FROM users WHERE id = ?';

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching user role:', err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        if (results.length > 0) {
            // Send back the role in JSON format
            res.status(200).json({ success: true, role: results[0].role });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    });
});

module.exports = router;
 */
//above working fine for the role


const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Endpoint to fetch user role and taskerId based on userId
router.get('/get-user-role', (req, res) => {
    const userId = req.query.userId;

    // If no userId is available, return a JSON error message
    if (!userId) {
        return res.status(400).json({ success: false, message: 'User is not logged in. Please log in first.' });
    }

    // Query to fetch user role and taskerId (if available) from the database
    const query = `
        SELECT 
            u.role, 
            tp.tasker_profile_id AS taskerId 
        FROM 
            users u 
        LEFT JOIN 
            TaskerProfile tp ON u.id = tp.id 
        WHERE 
            u.id = ?
    `;

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching user role and taskerId:', err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        if (results.length > 0) {
            // Send back both role and taskerId in JSON format
            const { role, taskerId } = results[0];
            res.status(200).json({ success: true, role, taskerId });
        } else {
            res.status(404).json({ success: false, message: 'User not found' });
        }
    });
});

module.exports = router;
