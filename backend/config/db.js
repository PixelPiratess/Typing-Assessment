const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB:', process.env.MONGODB_URI); // Log to verify connection string
    await mongoose.connect(process.env.MONGODB_URI, {});
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;