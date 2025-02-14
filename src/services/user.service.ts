import { AppDataSource } from "../config/database.config.ts";
import { User } from "../entities/user.entity.ts";
import { Repository } from "typeorm";

/**
 * Retrieves all users from the database.
 * @returns {Promise<User[]>} - A list of all users.
 */
async function getAllUsers(): Promise<User[]> {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  return await userRepository.find();
}

/**
 * Adds a new user to the database.
 * @param {Partial<User>} userCreationObject - The user data to be added.
 * @returns {Promise<User>} - The saved user data.
 */
async function addUser(userCreationObject: Partial<User>): Promise<User> {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const newUser = userRepository.create(userCreationObject);
  return await userRepository.save(newUser);
}

/**
 * Gets a single user by ID.
 * @param {string} userId - The ID of the user to retrieve.
 * @returns {Promise<User | null>} - The user data or null if not found.
 */
async function getUserById(userId: string): Promise<User | null> {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  return await userRepository.findOneBy({ id: userId });
}

/**
 * Gets a single user by phone number.
 * @param {string} phoneNumber - The phone number of the user to retrieve.
 * @returns {Promise<User | null>} - The user data or null if not found.
 */
async function getUserByPhoneNumber(phoneNumber: string): Promise<User | null> {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  return await userRepository.findOneBy({ phoneNumber });
}

/**
 * Checks if a user exists by email or phone number.
 * @param {string} email - The email to check.
 * @param {string} phoneNumber - The phone number to check.
 * @returns {Promise<boolean>} - True if the user exists, otherwise false.
 */
async function userExistsByEmailOrPhoneNumber(email: string, phoneNumber: string): Promise<boolean> {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: [{ email }, { phoneNumber }],
  });
  return !!user;
}

export {
  getAllUsers,
  userExistsByEmailOrPhoneNumber,
  getUserByPhoneNumber,
  getUserById,
  addUser,
};
