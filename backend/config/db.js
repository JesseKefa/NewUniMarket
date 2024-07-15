const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const db = process.env.MONGO_URI;

console.log('MongoDB URI:', db);

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
