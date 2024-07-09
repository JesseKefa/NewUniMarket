const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');
const connectDB = require('../config/db');

dotenv.config();

const seedAdmins = async () => {
  await connectDB();

  const admin1 = new Admin({
    email: 'admin1@example.com',
    password: await bcrypt.hash('adminpassword1', 10),
    name: 'Admin One',
  });

  const admin2 = new Admin({
    email: 'admin2@example.com',
    password: await bcrypt.hash('adminpassword2', 10),
    name: 'Admin Two',
  });

  await admin1.save();
  await admin2.save();

  console.log('Admins seeded');
  mongoose.disconnect();
};

seedAdmins().catch((err) => {
  console.error('Error seeding admins:', err);
  mongoose.disconnect();
});
