// server.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

connectDB();

// // MongoDB Connection
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/EasySellDB')
//   .then(() => console.log('✅ MongoDB connected'))
//   .catch(err => console.error('❌ MongoDB error:', err));

// Test Route
app.get('/', (req, res) => {
  res.json({ message: 'EasySell API is running!' });
});

// Import Routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

