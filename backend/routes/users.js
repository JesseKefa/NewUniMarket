const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get all users (for demonstration purposes, you might not need this)
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
