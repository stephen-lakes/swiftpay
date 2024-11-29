const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose
      .connect("mongodb://localhost:27017/swiftpay")
      .then(() => {
        console.log("Database Connected");
      });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
