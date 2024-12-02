const User = require("../models/user.model");

/**
 * Controller function to retrieve all users
 * @param {Object} request - Express request object
 * @param {Object} response - Express response object
 * @returns {Object} response - Express response object with status and data
 */
const getAllUsers = async (request, response) => {
  try {
    const users = await User.find();
    response.status(200).json({ mesage: "SUCCESS", data: users });
  } catch (error) {
    response.status(500).json({ error: "Failed to fetch users" });
  }
};

const getUserByID = async (request, response) => {
  try {
    const userId = request.params.id;
    const user = await User.findById(userId);

    if (!user) return response.status(404).json({ message: "User not found" });

    response.status(200).json({ message: "SUCCESS", data: user });
  } catch (error) {
    response.status(500).json({ message: "Failed to retrieve user" });
  }
};

/**
 * Controller function to retrieve a user by email
 * @param {Object} request - Express request object
 * @param {Object} response - Express response object
 * @returns {Object} response - Express response object with status and data
 */
const getUserByEmail = async (request, response) => {
  try {
    const userEmail = request.params.email;
    const user = await User.findOne({ email: userEmail });
    if (!user) return response.status(404).json({ message: "User not found" });

    response.status(200).json({ message: "SUCCESS", data: user });
  } catch (error) {
    response.status(500).json({ message: "Failed to retrieve user" });
  }
};

/**
 * Controller function to retrieve a user by phone number
 * @param {Object} request - Express request object
 * @param {Object} response - Express response object
 * @returns {Object} response - Express response object with status and data
 */
const getUserByPhoneNumber = async (request, response) => {
  try {
    const phoneNumber = request.params.phoneNumber;
    const user = await User.findOne({ phoneNumber });
    if (!user) return response.status(404).json({ message: "User not found" });

    response.status(200).json({ message: "SUCCESS", data: user });
  } catch (error) {
    response.status(500).json({ message: "Failed to retrieve user" });
  }
};

const getBalance = async (request, response) => {
  const userId = request.user.id;
  try {
    const user = await User.findById(userId);
    if (!user) return response.status(404).json({ message: "User not found" });
    response
      .status(200)
      .json({ message: "SUCCESS", data: { balance: user.balance } });
  } catch (error) {
    response.status(500).json({ message: "Failed to retrieve user balance" });
  }
};

const verifyEmail = async (request, response) => {
  try {
  } catch (error) {
    response.status(500).json({ message: "Email verification failed" });
  }
};
const verifyPhoneNumber = async () => {
  try {
  } catch (error) {
    response.status(500).json({ message: "Email verification failed" });
  }
};

module.exports = {
  getUserByEmail,
  getUserByID,
  getUserByPhoneNumber,
  getAllUsers,
  getBalance,
  verifyEmail,
  verifyPhoneNumber,
};
