

const db = require('../config/db');

const User = {
  // Method to create a new user (already implemented)
  create: (data, callback) => {
    const query = `INSERT INTO users (firstName, lastName, age, phone, email, password)
                   VALUES (?, ?, ?, ?, ?, ?)`;
    db.query(
      query,
      [data.firstName, data.lastName, data.age, data.phone, data.email, data.password],
      callback
    );
  },

  // Method to find a user by email (for login)
  findByEmail: (email, callback) => {
    const query = `SELECT * FROM users WHERE email = ? LIMIT 1`;
    db.query(query, [email], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      // If the user is found, return the first result (as we expect only one)
      return callback(null, result[0]);
    });
  },

  // Add other methods as needed
};

module.exports = User;
