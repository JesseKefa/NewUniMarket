const multer = require('multer');
const Product = require('../models/Product');

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage }).single('image');

exports.createProduct = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ msg: 'Error uploading file' });
    }

    const { name, description, price } = req.body;

    try {
      const newProduct = new Product({
        name,
        description,
        price,
        image: req.file.path
      });

      const product = await newProduct.save();
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  });
};
