const checkTokenValidity = require('../utils/checkToken');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  const { valid, decoded, message } = checkTokenValidity(token);
  if (!valid) {
    return res.status(401).json({ msg: message });
  }

  req.user = decoded.user;
  next();
};
