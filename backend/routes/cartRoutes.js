const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/auth');

router.post('/:userId', authMiddleware, cartController.addToCart);
router.get('/:userId', authMiddleware, cartController.getCart);
router.delete('/:userId/:productId', authMiddleware, cartController.removeFromCart); // Add this line

module.exports = router;
