const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/', authMiddleware, productController.addProduct);
router.get('/', productController.getProducts);
router.post('/cart', productController.getCart);
router.post('/favorites', productController.getFavorites);
router.get('/:id', productController.getProductById);

module.exports = router;
