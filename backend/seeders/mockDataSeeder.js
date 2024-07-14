const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

// Load environment variables from .env file located in the backend directory
dotenv.config({ path: require('path').resolve(__dirname, '../.env') });

const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('MongoDB URI is not defined');
  process.exit(1);
}

console.log(`MongoDB URI: ${mongoURI}`);

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected...'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

const seedUsers = async () => {
  const users = [];
  for (let i = 0; i < 30; i++) {
    users.push(new User({
      name: `User${i + 1}`,
      email: `user${i + 1}@example.com`,
      password: 'password', // This should ideally be hashed
    }));
  }
  await User.insertMany(users);
  console.log('Users seeded');
};

const seedProducts = async () => {
  const products = [];
  for (let i = 0; i < 30; i++) {
    products.push(new Product({
      title: `Product${i + 1}`,
      type: 'Type' + (i % 5 + 1), // Example types: Type1, Type2, ...
      category: 'Category' + (i % 3 + 1), // Example categories: Category1, Category2, ...
      price: Math.floor(Math.random() * 100) + 1,
      quantity: Math.floor(Math.random() * 100) + 1,
      description: `Description for product${i + 1}`,
    }));
  }
  await Product.insertMany(products);
  console.log('Products seeded');
};

const seedOrders = async () => {
  const users = await User.find();
  const products = await Product.find();

  const orders = [];
  for (let i = 0; i < 30; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const product = products[Math.floor(Math.random() * products.length)];

    orders.push(new Order({
      product: product._id,
      user: user._id,
      quantity: Math.floor(Math.random() * 10) + 1,
      paymentMethod: 'Credit Card', // or any other payment method
      total: product.price * (Math.floor(Math.random() * 10) + 1),
    }));
  }
  await Order.insertMany(orders);
  console.log('Orders seeded');
};

const seedDatabase = async () => {
  try {
    await mongoose.connection.dropCollection('users');
    await mongoose.connection.dropCollection('products');
    await mongoose.connection.dropCollection('orders');
    console.log('Collections dropped');
    
    await seedUsers();
    await seedProducts();
    await seedOrders();
    mongoose.connection.close();
  } catch (error) {
    console.error('Seeding error:', error);
    mongoose.connection.close();
  }
};

seedDatabase().catch(err => console.error(err));
