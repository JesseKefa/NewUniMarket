const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user profile image
router.put('/profile/image', authMiddleware, async (req, res) => {
  try {
    const { profileImage } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, { profileImage }, { new: true });
    res.json(user);
  } catch (error) {
    console.error('Error updating profile image:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
