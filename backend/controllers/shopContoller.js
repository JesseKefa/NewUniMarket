const Shop = require('../models/Shop');

exports.createShop = async (req, res) => {
  const { name, description } = req.body;

  try {
    const newShop = new Shop({
      name,
      description,
      user: req.user.id,
    });

    const shop = await newShop.save();
    res.json(shop);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getShopByUser = async (req, res) => {
  try {
    const shop = await Shop.findOne({ user: req.user.id });
    res.json(shop);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
