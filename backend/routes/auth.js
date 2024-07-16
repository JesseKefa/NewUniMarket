const express = require('express');
const router = express.Router();
const { register, login, verifyEmail } = require('../controllers/authController');

// Register user
router.post('/register', register);

// Login user
router.post('/login', login);

// Verify email
router.get('/verify-email/:token', verifyEmail);

module.exports = router;
