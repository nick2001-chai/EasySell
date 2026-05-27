const mongoose = require('mongoose');

const DB_HOST = process.env.MONGODB_URI

const connectDB = async () => {
  try {
    await mongoose.connect(DB_HOST);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
