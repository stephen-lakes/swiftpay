import { Request, Response } from "express";
import { User } from "../entities/user.entity.ts";
import { AppDataSource } from "../config/database.config.ts";

const userRepo = AppDataSource.getRepository(User);

/**
 * Controller function to retrieve all users
 * @param {Object} request - Express request object
 * @param {Object} response - Express response object
 * @returns {Object} response - Express response object with status and data
 */
export const getAllUsers = async (request: Request, response: Response): Promise<void> => {
  try {
    const users = await userRepo.find({ where: { firstName: "James" } });
    response.status(200).json({ message: "SUCCESS", data: users });
  } catch (error) {
    response.status(500).json({ error: "Failed to fetch users" });
  }
};

export const getUserByID = async (request: Request, response: Response): Promise<void> => {
  try {
    const userId = request.params.id;
    const user = await userRepo.findOneBy({id: userId});

    if (!user) response.status(404).json({ message: "User not found" });

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
export const getUserByEmail = async (request: Request, response: Response): Promise<void> => {
  try {
    const userEmail = request.params.email;
    const user = await userRepo.find({
      where: { email: userEmail },
    });
    if (!user) response.status(404).json({ message: "User not found" });

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
export const getUserByPhoneNumber = async (request: Request, response: Response): Promise<void> => {
  try {
    const phoneNumber = request.params.phoneNumber;
    const user = await userRepo.find({ where: { phoneNumber } });
    if (!user) response.status(404).json({ message: "User not found" });

    response.status(200).json({ message: "SUCCESS", data: user });
  } catch (error) {
    response.status(500).json({ message: "Failed to retrieve user" });
  }
};

export const getBalance = async (request:Request, response:Response): Promise<void> => {
  // const userId = request.user.id;
  // try {
  //   const user = await userRepo.findOne(userId);
  //   if (!user) response.status(404).json({ message: "User not found" });
  //   response
  //     .status(200)
  //     .json({ message: "SUCCESS", data: { balance: user.balance } });
  // } catch (error) {
  //   response.status(500).json({ message: "Failed to retrieve user balance" });
  // }
};

export const verifyEmail = async (request:Request, response:Response): Promise<void> => {
  try {
  } catch (error) {
    response.status(500).json({ message: "Email verification failed" });
  }
};
export const verifyPhoneNumber = async (request:Request, response:Response): Promise<void> => {
  try {
  } catch (error) {
    response.status(500).json({ message: "Email verification failed" });
  }
};
