const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Correcting the file name to match the actual file

const checkTokenValidity = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { valid: true, decoded, message: 'Token is valid' };
  } catch (err) {
    return { valid: false, decoded: null, message: 'Token is not valid' };
  }
};

module.exports = checkTokenValidity;
