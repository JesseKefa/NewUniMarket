const express = require('express');
const router = express.Router();
const { getAdminDashboard, manageUsers, manageProducts, viewOrders, manageCategories } = require('../controllers/adminController');

router.get('/dashboard', getAdminDashboard);
router.get('/users', manageUsers);
router.get('/products', manageProducts);
router.get('/orders', viewOrders);
router.get('/categories', manageCategories);

module.exports = router;
