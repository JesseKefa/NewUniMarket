const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  country: String,
  fullName: String,
  streetAddress: String,
  aptSuite: String,
  city: String,
  postalCode: String,
  setDefault: Boolean,
});

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
  },
  username: {
    type: String,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
  },
  about: {
    type: String,
  },
  address: [addressSchema],
  profileImage: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  roles: {
    type: [String],
    default: ['user'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);
