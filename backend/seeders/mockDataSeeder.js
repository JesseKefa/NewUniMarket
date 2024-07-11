const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const connectDB = require('../config/db');

dotenv.config();

const seedMockData = async () => {
  await connectDB();

  const mockUsers = [];
  for (let i = 1; i <= 30; i++) {
    const user = new User({
      email: `user${i}@example.com`,
      password: await bcrypt.hash('userpassword', 10),
      username: `user${i}`,
      gender: i % 2 === 0 ? 'Male' : 'Female',
      about: `About User ${i}`,
      address: {
        country: 'Country',
        fullName: `User ${i} FullName`,
        streetAddress: `Street Address ${i}`,
        aptSuite: `Apt Suite ${i}`,
        city: `City ${i}`,
        postalCode: `Postal Code ${i}`,
        setDefault: true,
      },
    });
    mockUsers.push(user);
  }

  const mockProducts = [];
  for (let i = 1; i <= 10; i++) {
    const product = new Product({
      category: `Category ${i}`,
      type: 'Physical',
      title: `Product ${i}`,
      description: `Description for product ${i}`,
      price: i * 10,
      quantity: i * 5,
      photos: [`https://example.com/photo${i}.jpg`],
      user: mockUsers[i % mockUsers.length]._id,
    });
    mockProducts.push(product);
  }

  const mockOrders = [];
  for (let i = 1; i <= 20; i++) {
    const order = new Order({
      user: mockUsers[i % mockUsers.length]._id,
      products: mockProducts.slice(0, 3).map((product) => ({
        product: product._id,
        quantity: 1,
      })),
      total: 30,
      status: 'pending'
    });
    mockOrders.push(order);
  }

  await User.insertMany(mockUsers);
  await Product.insertMany(mockProducts);
  await Order.insertMany(mockOrders);

  console.log('Mock data seeded');
  mongoose.disconnect();
};

seedMockData().catch((err) => {
  console.error('Error seeding mock data:', err);
  mongoose.disconnect();
});
