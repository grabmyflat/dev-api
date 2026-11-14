const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

const getDatabaseStatus = () => {
    switch (mongoose.connection.readyState) {
        case 0:
            return '🔴 DISCONNECTED';
        case 1:
            return '🟢 CONNECTED';
        case 2:
            return '🟡 CONNECTING';
        case 3:
            return '🟠 DISCONNECTING';
        default:
            return '⚪ UNKNOWN';
    }
};

module.exports = { connectDB, getDatabaseStatus };