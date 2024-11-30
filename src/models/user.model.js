const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

userSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  firstName: {
    type: String,
    requiured: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
    select: false, // Exclude password by default
  },
  balance: {
    type: mongoose.Schema.Types.Decimal128,
    required: true,
    default: 0.0,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  OTP: {
    type: String,
    required: false,
  },
  OTPExpriresAt: {
    type: Date,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
