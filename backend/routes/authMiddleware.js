const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key'; // Use the same secret key

const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });
    req.userID = decoded.userID; // Store user ID for later use
    next();
  });
};

module.exports = authMiddleware;
