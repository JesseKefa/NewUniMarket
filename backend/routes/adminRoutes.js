const express = require('express');
const { getAllUsers, getAllProducts } = require('../controllers/adminController'); // Ensure these functions are correctly imported
const router = express.Router();

// Define admin routes
router.get('/users', getAllUsers);
router.get('/products', getAllProducts);

module.exports = router;
