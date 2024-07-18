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
