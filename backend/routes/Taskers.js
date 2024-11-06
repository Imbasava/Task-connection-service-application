// routes/Taskers.js

const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Ensure db is correctly configured and connected

// GET taskers based on serviceId
router.get('/Taskers', async (req, res) => {
  const { serviceId } = req.query;

  if (!serviceId) {
    return res.status(400).json({ message: 'Service ID is required' });
  }

  try {
    const query = `
      SELECT 
        tp.tasker_profile_id AS tasker_Profile_Id, 
        CONCAT(u.firstname, ' ', u.lastname) AS taskerName,
        ps.experience, 
        ps.hourly_rate AS hourlyRate
      FROM 
        ProvideService ps
      JOIN 
        TaskerProfile tp ON ps.tasker_profile_id = tp.tasker_profile_id
      JOIN 
        users u ON tp.id = u.id
      WHERE 
        ps.service_id = ?`;
   
    db.query(query, [serviceId], (err, results) => {
      if (err) {
        console.error('Error fetching taskers:', err);
        return res.status(500).json({ message: 'Error fetching taskers' });
      }
     
      res.status(200).json(results);
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
