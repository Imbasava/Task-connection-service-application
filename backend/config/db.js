require('dotenv').config();
const mysql = require('mysql');

// Create a connection pool to handle multiple connections
const db = mysql.createPool({
  connectionLimit: 10, // Limit the number of concurrent connections
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Test database connection
db.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database');
  connection.release(); // Release the connection back to the pool
});

module.exports = db;

