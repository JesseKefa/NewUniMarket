const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

// Configure multer for file uploads
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
  limits: { fileSize: 1000000 }, // Limit file size to 1MB
}).single('file');

exports.addProduct = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ msg: 'Error uploading file' });
    }
    const { shopName, category, type, title, description, price, quantity } = req.body;

    try {
      const newProduct = new Product({
        shopName,
        category,
        type,
        title,
        description,
        price,
        quantity,
        imageUrl: req.file.path,
        user: req.user.id,
      });

      const product = await newProduct.save();
      res.json(product);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('user', ['username', 'email']);
    res.json(products);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
