const { AppDataSource } = require("../config/database.config");
const User = require("../entities/user");

/**
 * Retrieves all users from the database.
 * @returns {Promise<Array>} - A list of all users.
 */
async function getAllUsers() {
  const userRepository = AppDataSource.getRepository("User");
  return await userRepository.find();
}

/**
 * Adds a new user to the database.
 * @param {Object} userData - The user data to be added.
 * @returns {Promise<Object>} - The saved user data.
 */
async function addUser(userData) {
  const userRepository = AppDataSource.getRepository("User");
  const newUser = userRepository.create(userData);
  return await userRepository.save(newUser);
}

/**
 * Gets a single user by ID.
 * @param {string} userId - The ID of the user to retrieve.
 * @returns {Promise<Object|null>} - The user data or null if not found.
 */
async function getUserById(userId) {
  const userRepository = AppDataSource.getRepository("User");
  return await userRepository.findOneBy({ id: userId });
}

/**
 * Gets a single user by phone number.
 * @param {string} phoneNumber - The phone number of the user to retrieve.
 * @returns {Promise<Object|null>} - The user data or null if not found.
 */
async function getUserByPhoneNumber(phoneNumber) {
  const userRepository = AppDataSource.getRepository("User");
  return await userRepository.findOneBy({ phoneNumber });
}

/**
 * Checks if a user exists by email or phone number.
 * @param {string} email - The email to check.
 * @param {string} phoneNumber - The phone number to check.
 * @returns {Promise<boolean>} - True if the user exists, otherwise false.
 */
async function userExistsByEmailOrPhoneNumber(email, phoneNumber) {
  const userRepository = AppDataSource.getRepository("User");
  const user = await userRepository.findOne({
    where: [{ email }, { phoneNumber }],
  });
  return !!user;
}

module.exports = {
  getAllUsers,
  userExistsByEmailOrPhoneNumber,
  getUserByPhoneNumber,
  getUserById,
  addUser,
};
