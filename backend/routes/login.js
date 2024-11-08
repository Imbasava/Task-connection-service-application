const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET;  // Secret key from environment variables

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Use the findByEmail method from User model
    User.findByEmail(email, async (err, user) => {
      if (err) {
        return res.status(500).json({ message: 'Error finding user' });
      }
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }

      // Compare the entered password with the hashed password stored in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid password' });
      }

      // Generate JWT token with userID payload
      const token = jwt.sign({ userID: user.id }, SECRET_KEY, { expiresIn: '0.5h' });
      
      // Send response with token and user details
      return res.json({ 
        message: 'Login successful', 
        token, 
        userID: user.id, // Ensure you're using the correct field for userID
        name: `${user.firstname} ${user.lastname}` // Combine first and last name
      });
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
