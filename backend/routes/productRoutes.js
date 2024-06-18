const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Product = require('../models/Product');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('postedBy', 'username');
    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Create a product
router.post('/', authMiddleware, async (req, res) => {
  const { name, description, price, image } = req.body;

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      image,
      postedBy: req.user.id,
    });

    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
