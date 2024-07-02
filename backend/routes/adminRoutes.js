const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

const router = express.Router();

// Get all users
router.get('/users', authMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all products
router.get('/products', authMiddleware, async (req, res) => {
  try {
    const products = await Product.find().populate('user', ['username', 'email']);
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get all orders
router.get('/orders', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find().populate('user', ['username', 'email']).populate('products.product', ['title', 'price']);
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
