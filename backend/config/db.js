const mongoose = require('mongoose');
//#MONGODB_URI="mongodb+srv://gow:dharshanpower@fee.ti6uj2q.mongodb.net/?appName=fee" mongodb://localhost:27017/school_fee_portal
const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://gow:dharshanpower@fee.ti6uj2q.mongodb.net/?appName=fee', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;