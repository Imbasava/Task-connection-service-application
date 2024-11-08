/* const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../config/db'); // Database configuration file

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// Route to create/update tasker profile
router.post('/TaskerProfile', upload.single('image'), async (req, res) => {
  try {
    const { area, city, state, pincode, bio, userID } = req.body; // userID is the foreign key from frontend
    const imagePath = req.file ? req.file.path : null;

    // Insert or update TaskerProfile
    const query = `
      INSERT INTO TaskerProfile (id, bio, area, city, state, pincode, availability_status, image ,created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, 1, ?,NOW(), NOW())
      ON DUPLICATE KEY UPDATE
        bio = VALUES(bio), area = VALUES(area), city = VALUES(city), state = VALUES(state), pincode = VALUES(pincode),
        updated_at = NOW(), image = VALUES(image)
    `;

    db.query(query, [userID, bio, area, city, state, pincode, imagePath], (err, result) => {
      if (err) {
        console.error('Error saving profile:', err);
        return res.status(500).json({ message: 'Error saving profile' });
      }
       // Retrieve the last inserted taskerProfileId
       const taskerProfileId = result.insertId;


       res.status(200).json({
        message: 'Profile saved successfully',
        taskerProfileId, // Include the taskerProfileId in the response
      });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error processing request' });
  }
});

  



// In TaskerProfile.js (backend)
const util = require('util'); // Import util to use promisify

// Assuming `db` is your MySQL connection or pool instance
const query = util.promisify(db.query).bind(db);

router.get('/:userID', async (req, res) => {
  try {
    const { userID } = req.params;

    // Query the database for the profile associated with the userID
    const rows = await query(`SELECT * FROM TaskerProfile WHERE id = ?`, [userID]);

    // Log the rows to verify the returned data structure
    console.log('Query Result Rows:', rows);

    // Check if rows array has elements and extract the profile
    if (rows.length > 0) {
      const profile = rows[0]; // Assuming the first element is the profile
      res.json(profile);
    } else {
      res.status(404).json({ message: 'Profile not found' });
    }
  } catch (error) {
    console.error('Error fetching profile:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error fetching profile' });
  }
});


module.exports = router;
 */



const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const db = require('../config/db'); // Database configuration file
const util = require('util'); // Import util to use promisify

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

// Promisify the db.query function for async/await
const query = util.promisify(db.query).bind(db);

// Route to create/update tasker profile
router.post('/TaskerProfile', upload.single('image'), async (req, res) => {
  try {
    const { area, city, state, pincode, bio, userID } = req.body; // userID is the foreign key from frontend
    const imagePath = req.file ? req.file.path : null;

    // Insert or update TaskerProfile
    const taskerProfileQuery = `
      INSERT INTO TaskerProfile (id, bio, area, city, state, pincode, availability_status, image, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, 1, ?, NOW(), NOW())
      ON DUPLICATE KEY UPDATE
        bio = VALUES(bio), area = VALUES(area), city = VALUES(city), state = VALUES(state), pincode = VALUES(pincode),
        updated_at = NOW(), image = VALUES(image)
    `;

    db.query(taskerProfileQuery, [userID, bio, area, city, state, pincode, imagePath], async (err, result) => {
      if (err) {
        console.error('Error saving profile:', err);
        return res.status(500).json({ message: 'Error saving profile' });
      }

      // After successfully creating/updating the tasker profile, update the user's role
      const updateRoleQuery = `
        UPDATE users SET role = ? WHERE id = ?
      `;

      try {
        // Update the user's role to 'tasker'
        await query(updateRoleQuery, ['tasker', userID]);

        // Send response with taskerProfileId
        const taskerProfileId = result.insertId || result.insertId; // TaskerProfile ID after insertion
        res.status(200).json({
          message: 'Profile saved successfully, and user role updated to tasker',
          taskerProfileId, // Include the taskerProfileId in the response
        });
      } catch (err) {
        console.error('Error updating role:', err);
        return res.status(500).json({ message: 'Error updating user role' });
      }
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error processing request' });
  }
});

// Route to get tasker profile by userID
router.get('/:userID', async (req, res) => {
  try {
    const { userID } = req.params;

    // Query the database for the profile associated with the userID
    const rows = await query(`SELECT * FROM TaskerProfile WHERE id = ?`, [userID]);

    // Log the rows to verify the returned data structure
    console.log('Query Result Rows:', rows);

    // Check if rows array has elements and extract the profile
    if (rows.length > 0) {
      const profile = rows[0]; // Assuming the first element is the profile
      res.json(profile);
    } else {
      res.status(404).json({ message: 'Profile not found' });
    }
  } catch (error) {
    console.error('Error fetching profile:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

module.exports = router;
