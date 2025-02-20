const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateUser = async (req, res, next) => {
  const token = req.header('Authorization').split(" ")[1]

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  console.log(token)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    console.log(req.user)
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = { authenticateUser };
