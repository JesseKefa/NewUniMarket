const express = require('express');
const { addProduct, getProducts } = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get all products
router.get('/', getProducts);

// Create a product
router.post('/', authMiddleware, addProduct);

module.exports = router;
