const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  category: { type: String, required: true },
  type: { type: String, required: true }, // Physical or Digital
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  photos: { type: [String], required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Product', ProductSchema);
