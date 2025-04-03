const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }

  const secretKey = process.env.TOKEN_SECRET;
  if (!secretKey) {
    console.error('TOKEN_SECRET is not defined in the environment variables.');
    return res.status(500).json({ error: 'Internal server error: Missing token secret key' });
  }

  console.log('Token received:', token); // Log the token
  console.log('Using secret key:', secretKey); // Log the secret key

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.error('Token verification failed:', err.message); // Log the error
      return res.status(403).json({ error: 'Forbidden: Invalid token' });
    }
    console.log('Token verified successfully. User:', user); // Log the decoded user
    req.user = user; // Attach the user object to the request
    next();
  });
};

module.exports = authenticateToken;