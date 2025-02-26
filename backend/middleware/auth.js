// middleware/auth.js

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get token from headers
  const authHeader = req.header('Authorization');

  // Check if auth header is missing
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization denied. No token provided.' });
  }

  // Split the Bearer token
  const token = authHeader.split(' ')[1];

  // Check if token is missing
  if (!token) {
    return res.status(401).json({ message: 'Authorization denied. Token is missing.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify using JWT secret from config
    req.user = decoded.user; // Attach user object to request object
    next(); // Move to next middleware or route handler
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid.' });
  }
};

module.exports = authMiddleware;
