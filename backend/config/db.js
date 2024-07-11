const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const db = process.env.MONGO_URI;

console.log('MongoDB URI:', db); 

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
