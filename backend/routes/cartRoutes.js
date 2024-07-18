const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const cartController = require('../controllers/cartController');

// Add product to cart
router.post('/:userId', authMiddleware, cartController.addToCart);

// Get cart items
router.get('/:userId', authMiddleware, cartController.getCart);

module.exports = router;
