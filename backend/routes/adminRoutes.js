const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// Admin routes that require authentication
router.get('/dashboard-data', authMiddleware, adminController.getDashboardData);
router.get('/users', authMiddleware, adminController.getUsers);
router.get('/products', authMiddleware, adminController.getProducts);
router.get('/orders', authMiddleware, adminController.getOrders);
router.get('/categories', authMiddleware, adminController.getCategories);
router.post('/categories', authMiddleware, adminController.addCategory); // Added authMiddleware here

module.exports = router;
