const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Make sure to import your database connection

// POST route to provide a service
router.post('/services', async (req, res) => {
    const { taskerProfileId, serviceId, experience, hourlyRate } = req.body;

    // Log received data for debugging
    console.log('Received data:', { taskerProfileId, serviceId, experience, hourlyRate });

    try {
        const query = `
            INSERT INTO ProvideService (tasker_profile_id, service_id, experience, hourly_Rate)
            VALUES (?, ?, ?, ?)
        `;

        db.query(query, [taskerProfileId, serviceId, experience, hourlyRate], (err, result) => {
            if (err) {
                console.error('Error providing service:', err); // Log the error
                return res.status(500).json({ message: 'Error providing service' });
            }
            res.status(200).json({ message: 'Service provided successfully' });
        });
    } catch (error) {
        console.error('Error:', error); // Log the error
        res.status(500).json({ message: 'Error processing request' });
    }
});


module.exports = router;
