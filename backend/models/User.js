const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  dob: { type: Date, required: true },
  isVerified: { type: Boolean, default: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  avatar: { type: String },
  address: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  },
  paymentMethods: [{
    type: String,
    last4: String,
    expDate: String
  }]
});

module.exports = mongoose.model('User', UserSchema);
