const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { authenticator } = require("otplib");
const nodemailer = require("nodemailer");

require("dotenv").config();

const User = require("../models/user.model");

const createTransporter = () =>
  nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE_PROVIDER,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

const sendOtpEmail = async (email, OTP) => {
  const transporter = createTransporter();
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Verify Your Email",
    text: `Your OTP is ${OTP}. It expires in 10 minutes.`,
  });
};

const register = async (request, response) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = request.body;
    if (!firstName || !lastName || !phoneNumber || !email || !password) {
      return response.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return response.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const secret = authenticator.generateSecret();
    const OTP = authenticator.generate(secret);
    const OTPExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    const newUser = new User({
      _id: uuidv4(),
      firstName,
      lastName,
      phoneNumber,
      email,
      OTP,
      OTPExpiresAt,
      password: hashedPassword,
      balance: 10000,
    });

    const savedUser = await newUser.save();
    const { password: _, ...userWithoutPassword } = savedUser.toObject();

    await sendOtpEmail(email, OTP);

    return response.status(201).json({
      message: "User registered successfully, please verify your email",
      user: userWithoutPassword,
    });
  } catch (error) {
    response.status(500).json({ error: "Failed to register user" });
  }
};

const login = async (request, response) => {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      return response
        .status(400)
        .json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) return response.status(400).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return response.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const { password: _, ...userWithoutPassword } = user.toObject();

    return response.status(200).json({
      message: "Login successful",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    response.status(500).json({ error: "Failed to login user" });
  }
};

const logout = async (req, res) => {
  try {
    return response.status(200).json({ message: "Logout successful" });
  } catch (error) {
    response.status(500).json({ error: "Failed to logout user" });
  }
};

module.exports = {
  register,
  login,
  logout,
};
