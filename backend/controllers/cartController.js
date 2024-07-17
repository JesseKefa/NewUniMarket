const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
      if (itemIndex > -1) {
        let item = cart.items[itemIndex];
        item.quantity += 1;
        cart.items[itemIndex] = item;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }
    } else {
      cart = new Cart({
        userId,
        items: [{ productId, quantity: 1 }],
      });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId }).populate('items.productId');
    if (!cart) {
      return res.status(404).json({ msg: 'Cart not found' });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error' });
  }
};
