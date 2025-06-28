const jwt = require('jsonwebtoken');
const SECRET = 'YOUR_SECRET_KEY';

exports.protect = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Not authorized' });

  token = token.split(' ')[1]; // Bearer <token>
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};
