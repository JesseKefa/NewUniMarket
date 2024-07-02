const express = require('express');
const { createShop, getShopByUser } = require('../controllers/shopController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createShop);
router.get('/myshop', authMiddleware, getShopByUser);

module.exports = router;
