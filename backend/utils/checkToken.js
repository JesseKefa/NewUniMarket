const jwt = require('jsonwebtoken');
const config = require('config');

function checkTokenValidity(token) {
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    return { valid: true, decoded };
  } catch (err) {
    return { valid: false, message: 'Token is not valid' };
  }
}

module.exports = checkTokenValidity;
