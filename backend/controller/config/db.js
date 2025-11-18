const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`connectd to mongodb`);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = connectDB;
