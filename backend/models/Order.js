const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true }
  }],
  total: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'processed', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  paymentMethod: { type: String, required: true }, // e.g., 'Credit Card', 'PayPal', 'Cash on Delivery'
  shippingAddress: {
    country: String,
    fullName: String,
    streetAddress: String,
    aptSuite: String,
    city: String,
    postalCode: String,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

OrderSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Order', OrderSchema);
