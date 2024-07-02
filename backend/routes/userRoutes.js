const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

const router = express.Router();

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  const { username, phoneNumber, dob, address, avatar } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      user.username = username || user.username;
      user.phoneNumber = phoneNumber || user.phoneNumber;
      user.dob = dob || user.dob;
      user.address = address || user.address;
      user.avatar = avatar || user.avatar;
      await user.save();
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
