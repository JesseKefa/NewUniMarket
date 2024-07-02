const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { getUserProfile, updateUserProfile } = require('../controllers/userController');

router.get('/me', authMiddleware, getUserProfile);
router.put('/update', authMiddleware, updateUserProfile);

module.exports = router;
