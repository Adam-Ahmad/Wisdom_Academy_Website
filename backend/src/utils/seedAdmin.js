require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const exists = await User.findOne({ email: process.env.ADMIN_SEED_EMAIL });
  if (!exists) {
    await User.create({ name: 'Super Admin', email: process.env.ADMIN_SEED_EMAIL, password: process.env.ADMIN_SEED_PASSWORD, role: 'admin' });
    console.log('✅ Admin created');
  }
  process.exit();
};
seed();