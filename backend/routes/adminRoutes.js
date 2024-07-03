const express = require('express');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth'); // Ensure this path is correct
const User = require('../models/User');

const router = express.Router();

// Example admin route
router.get('/admin/dashboard', auth, async (req, res) => {
  try {
    const adminUser = await User.findById(req.user.id).select('-password');
    res.json(adminUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
