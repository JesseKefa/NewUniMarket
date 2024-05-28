const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  verified: { type: Boolean, default: false },
  twoFactorCode: { type: String }
});

module.exports = mongoose.model('User', UserSchema);
