
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const router = express.Router();

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { firstName, lastName, age, phone, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    User.create(
      { firstName, lastName, age, phone, email, password: hashedPassword },
      (err, result) => {
        if (err) {
          console.error('Error saving user:', err.message);
          return res.status(500).json({ error: 'Failed to sign up' });
        }
        res.status(201).json({ message: 'User created successfully', userId: result.insertId });
      }
    );
  } catch (error) {
    res.status(500).json({ error: 'Failed to sign up' });
  }
});

module.exports = router;
