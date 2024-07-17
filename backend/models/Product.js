const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  category: { type: String, required: true },
  type: { type: String, required: true }, // Physical or Digital
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  images: { type: [String], required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  rating: {
    type: Number,
    default: 0,
  },
  reviews: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Product', ProductSchema);
