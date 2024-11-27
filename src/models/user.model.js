const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

userSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuidv4,
  },
  firstname: {
    type: String,
    requiured: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  balance: {
    type: String,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
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
