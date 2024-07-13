const express = require('express');
const { getDashboardData, manageUsers, manageProducts, viewOrders, manageCategories } = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/dashboard-data', authMiddleware, getDashboardData);
router.get('/users', authMiddleware, manageUsers);
router.get('/products', authMiddleware, manageProducts);
router.get('/orders', authMiddleware, viewOrders);
router.get('/categories', authMiddleware, manageCategories);

module.exports = router;
