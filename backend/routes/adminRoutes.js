const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/dashboard-data', adminController.getDashboardData);
router.get('/users', adminController.getUsers);
router.get('/products', adminController.getProducts);
router.get('/orders', adminController.getOrders);
router.get('/categories', adminController.getCategories);

module.exports = router;
