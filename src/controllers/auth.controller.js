const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { authenticator } = require("otplib");

require("dotenv").config();

const User = require("../models/user.model");

const register = async (request, response) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = request.body;
    if (!firstName || !lastName || !phoneNumber || !email || !password)
      return response.status(400).json({
        message:
          "firstName, lastName, phoneNumber, email, and password are required",
      });

    // Check if users already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return response
        .status(400)
        .json({ message: "User already exists with the provided email" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a secret key
    const secret = authenticator.generateSecret();
    // Generate a 6-digit OTP

    const OTP = authenticator.generate(secret);
    // OTP expiration date: 10 minutes into the future
    const OTPExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Generate id
    const _id = uuidv4();
    const newUserPayload = {
      _id,
      firstName,
      lastName,
      phoneNumber,
      email,
      isVerified,
      OTP,
      OTPExpiresAt,
      password: hashedPassword,
      balance: 10000,
    };

    const newUser = new User(newUserPayload);
    const savedUser = await newUser.save();
    // Exclude sensitive data from response
    const { password: _, ...userWithoutPassword } = savedUser.toObject();
    return response.status(201).json({
      message: "User registered successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    response.status(500).json({ error: "Failed to register user" });
  }
};

const login = async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password)
      return response
        .status(400)
        .json({ error: "email and password are required" });

    // Find the user by email
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(400).json({ message: "User not found" });

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return response.status(401).json({ error: "Invalid email or password" });

    // Generate a JWT token
    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Exclude password from the response
    const { password: _, ...userWithoutPassword } = user.toObject();

    return response
      .status(200)
      .json({ message: "Login successful", token, user: userWithoutPassword });
  } catch (error) {
    response.status(500).json({ error: "failed to login user" });
  }
};

const logout = async (request, response) => {
  try {
    return response.status(200).json({ message: "Logout successful" });
  } catch (error) {}
};

module.exports = {
  register,
  login,
  logout,
};
