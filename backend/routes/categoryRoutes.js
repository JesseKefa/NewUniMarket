const express = require('express');
const Category = require('../models/Category');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new category
router.post('/', authMiddleware, async (req, res) => {
  const { name } = req.body;
  const category = new Category({ name });

  try {
    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
