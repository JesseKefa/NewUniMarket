const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const bcrypt = require('bcryptjs');

dotenv.config({ path: '../.env' }); // Ensure the correct path to the .env file
const db = process.env.MONGO_URI;

if (!db) {
  console.error('MongoDB URI is not defined');
  process.exit(1);
}

const mockUsers = async () => {
  await User.deleteMany();
  const users = [];

  for (let i = 1; i <= 30; i++) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(`password${i}`, salt);
    users.push({
      username: `user${i}`,
      email: `user${i}@example.com`,
      password: hashedPassword,
      role: 'user',
    });
  }

  await User.insertMany(users);
  console.log('Mock users added');
};

const mockProducts = async () => {
  await Product.deleteMany();
  const products = [];

  for (let i = 1; i <= 20; i++) {
    products.push({
      name: `Product ${i}`,
      description: `Description for product ${i}`,
      price: Math.floor(Math.random() * 100) + 1,
      stock: Math.floor(Math.random() * 50) + 1,
    });
  }

  await Product.insertMany(products);
  console.log('Mock products added');
};

const mockOrders = async () => {
  await Order.deleteMany();
  const orders = [];

  const users = await User.find();
  const products = await Product.find();

  for (let i = 1; i <= 20; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    orders.push({
      user: user._id,
      products: [{ product: product._id, quantity: Math.floor(Math.random() * 5) + 1 }],
      totalAmount: product.price * Math.floor(Math.random() * 5) + 1,
      status: 'completed',
    });
  }

  await Order.insertMany(orders);
  console.log('Mock orders added');
};

const seedMockData = async () => {
  await mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  await mockUsers();
  await mockProducts();
  await mockOrders();

  mongoose.connection.close();
};

seedMockData();
