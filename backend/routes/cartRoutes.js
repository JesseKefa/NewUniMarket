const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart'); // Assuming you have a Cart model

// Get cart by user ID
router.get('/:userId', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId });
    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' });
    }
    res.json(cart);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
