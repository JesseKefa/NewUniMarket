const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB limit
}).array('images', 10); // Allow up to 10 images

const addProduct = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Multer error:', err);
      return res.status(400).json({ msg: 'Error uploading files', error: err });
    }

    const { category, title, description, price, quantity } = req.body;

    if (!category || !title || !description || !price || !quantity) {
      console.log('Missing fields:', { category, title, description, price, quantity });
      return res.status(400).json({ msg: 'All fields are required' });
    }

    const productImages = req.files.map((file) => file.filename);

    const newProduct = new Product({
      category,
      title,
      description,
      price,
      quantity,
      images: productImages,
      user: req.user.id,
    });

    try {
      const product = await newProduct.save();
      res.json(product);
    } catch (error) {
      console.error('Error saving product:', error.message);
      res.status(500).send('Server error');
    }
  });
};

module.exports = {
  addProduct,
};
