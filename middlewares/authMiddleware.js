const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_jwt_secret_key';

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return res.status(403).json({ error: 'Invalid token' });
      req.user = decoded;
      next();
    });
  } else {
    res.status(401).json({ error: 'No token provided' });
  }
};