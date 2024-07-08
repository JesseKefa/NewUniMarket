const express = require('express');
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB limit
}).array('photos', 10); // Maximum of 10 photos

// Add new product
router.post('/add', authMiddleware, (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ msg: 'Error uploading file' });
    }

    const { category, type, title, description, price, quantity } = req.body;
    const photos = req.files.map(file => file.filename);

    try {
      const newProduct = new Product({
        category,
        type,
        title,
        description,
        price,
        quantity,
        photos,
        user: req.user.id,
      });

      const product = await newProduct.save();
      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
});

module.exports = router;
