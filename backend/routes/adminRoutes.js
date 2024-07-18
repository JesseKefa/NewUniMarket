const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Admin routes that require authentication
router.get('/dashboard-data', authMiddleware, adminMiddleware, adminController.getDashboardData);
router.get('/users', authMiddleware, adminMiddleware, adminController.getUsers);
router.get('/products', authMiddleware, adminMiddleware, adminController.getProducts);
router.get('/orders', authMiddleware, adminMiddleware, adminController.getOrders);
router.get('/categories', authMiddleware, adminMiddleware, adminController.getCategories);
router.post('/categories', authMiddleware, adminMiddleware, adminController.addCategory);

module.exports = router;
