const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  const userId = req.user.id;
  const { items, totalAmount, paymentMethod } = req.body;

  try {
    const newOrder = new Order({
      user: userId,
      items,
      totalAmount,
      paymentMethod,
      status: 'Pending'
    });

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate('items.productId', ['title', 'price']);
    res.json(orders);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
