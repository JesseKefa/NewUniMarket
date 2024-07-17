const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('config');

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

// Import Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const adminRoutes = require('./routes/adminRoutes');
const adminAuthRoutes = require('./routes/adminAuthRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes'); // Added cart routes

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes); // Ensure this route is correct
app.use('/api/payments', paymentRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/auth', adminAuthRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes); // Use cart routes

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = config.get('port') || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
