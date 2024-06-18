const express = require('express');
const router = express.Router();

// Sample products data
const products = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Description for Product 1',
    price: 10,
    image: '/images/product1.jpg',
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Description for Product 2',
    price: 20,
    image: '/images/product2.jpg',
  },
  // Add more products as needed
];

router.get('/', (req, res) => {
  res.json(products);
});

module.exports = router;
