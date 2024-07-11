const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

const getDashboardData = async (req, res) => {
  try {
    const usersCount = await User.countDocuments();
    const productsCount = await Product.countDocuments();
    const ordersCount = await Order.countDocuments();
    const orders = await Order.find().populate('user').populate('products.product');

    res.json({ usersCount, productsCount, ordersCount, orders });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getDashboardData };
