const User = require("../models/user.model");

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
    const user = await User.findByID(userId);

    if (!user) return response.status(404).json({ message: "User not found" });

    response.status(200).json({ message: "SUCCESS", data: user });
  } catch (error) {
    response.status(500).json({ message: "Failed to retrieve user" });
  }
};

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

const getUserByPhoneNumber = async (request, response) => {
  try {
    const userPhoneNumber = request.params.userPhoneNumber;
    const user = await User.findOne({ phoneNumber: userPhoneNumber });
    if (!user) return response.status(404).json({ message: "User not found" });
  } catch (error) {
    response.status(500).json({ message: "Failed to retrieve user" });
  }
};

module.exports = {
  getUserByEmail,
  getUserByID,
  getUserByPhoneNumber,
  getAllUsers,
};
