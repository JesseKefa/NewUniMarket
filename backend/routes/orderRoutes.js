const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Order = require('../models/Order');

const router = express.Router();

// Create an order
router.post('/', authMiddleware, async (req, res) => {
  const { products, total } = req.body;
  try {
    const newOrder = new Order({
      user: req.user.id,
      products,
      total
    });
    const order = await newOrder.save();
    res.json(order);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get user orders
router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('products.product', ['title', 'price']);
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
