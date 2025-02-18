import express, { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validate } from "class-validator";
import { SignUpDto, SignInDto } from "../dtos/auth.dto.ts";
import { User } from "../entities/user.entity.ts";
import { AppDataSource } from "../database.config.ts";
import { ResponseType, Utility } from "../utils/utilities.ts";

const router: Router = express.Router();
const userRepository = AppDataSource.getRepository(User);

const AuthController = {
  signup: async (req: Request, res: Response) => {
    try {
      const signUpData = new SignUpDto(req.body);
      const errors = await validate(signUpData);

      if (errors.length > 0) {
        const detailedErrors = errors.map((err) => ({
          property: err.property,
          constraints: err.constraints,
        }));
        Utility.sendResponse(res, {
          status: `error`,
          message: `Sign up validation failed`,
          code: 400,
          data: detailedErrors,
        });
        return;
      }

      // Check if email or phone number already exists
      const existingUser = await userRepository.findOne({
        where: [
          { email: signUpData.email },
          { phoneNumber: signUpData.phoneNumber },
        ],
      });

      if (existingUser) {
        Utility.sendResponse(res, {
          status: `failed`,
          message: `User already exists`,
          code: 409,
        });
        return;
      }

      // Hash the password before saving the user
      const hashedPassword = await bcrypt.hash(signUpData.password, 10);
      signUpData.password = hashedPassword;

      // Proceed with business logic if validation succeeds
      const newUser = userRepository.create(signUpData);
      await userRepository.save(newUser);

      Utility.sendResponse(res, {
        status: `success`,
        message: `User registered successfully`,
        code: 201,
        data: { ...signUpData },
      });
    } catch (error) {
      console.error("Sign-up error:", error);
      Utility.sendResponse(res, {
        status: `failed`,
        message: `Failed to Sign up`,
        code: 500,
        data: { error: error.message },
      });
    }
  },

  signin: async (req: Request, res: Response) => {
    const signInData = new SignInDto(req.body);
    const errors = await validate(signInData);

    if (errors.length > 0) {
      const detailedErrors = errors.map((err) => ({
        property: err.property,
        constraints: err.constraints,
      }));

      Utility.sendResponse(res, {
        status: `error`,
        message: `Sign in validation failed`,
        code: 400,
        data: detailedErrors,
      });
      return;
    }

    // Check if email or phone number already exists
    const user = await userRepository.findOne({
      where: [{ email: signInData.email }],
    });

    if (!user) {
      Utility.sendResponse(res, {
        status: `failed`,
        message: `User does not exists`,
        code: 404,
      });
      return;
    }

    const match = await bcrypt.compare(signInData.password, user.password);
    if (!match) {
      Utility.sendResponse(res, {
        status: `failed`,
        message: `Invalid login credentials`,
        code: 401,
      });
      return;
    }

    const data = {
      firstName: user.firstName,
      lasttName: user.lastName,
      userId: user.id,
    };
    const jwtSecretKey = process.env.JWT_SECRET;
    const token = jwt.sign(data, jwtSecretKey);
    Utility.sendResponse(res, {
      status: `success`,
      message: `sign in successful`,
      code: 200,
      data: {
        ...user,
        token,
      },
    });
  },
};

export default AuthController;
