const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const orderController = require('../controllers/orderController');

const router = express.Router();

// Create an order
router.post('/', authMiddleware, orderController.createOrder);

// Get user orders
router.get('/', authMiddleware, orderController.getUserOrders);

module.exports = router;
