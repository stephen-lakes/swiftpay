import express, { Request, Response, Router } from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { SignUpDto, SignInDto } from "../dtos/auth.dto.ts";
import { validate } from "class-validator";
import { User } from "../entities/user.entity.ts";
import { AppDataSource } from "../config/database.config.ts";
import { ResponseType, Utility } from "../utils/utilities.ts";

const router: Router = express.Router();
const userRepository = AppDataSource.getRepository(User);

router.post("/", (req: Request, res: Response) => {
  const data: ResponseType = {
    status: `success`,
    message: `AUTH endpoint`,
    code: 200,
  }
  Utility.sendResponse(res, data)
});

// User Registration
router.post("/sign-up", async (req: Request, res: Response) => {
  try {
    const signUpData = new SignUpDto(req.body);
    const errors = await validate(signUpData);

    if (errors.length > 0) {
      const detailedErrors = errors.map((err) => ({
        property: err.property,
        constraints: err.constraints,
      }));
      res
        .status(400)
        .json({ message: "Sign up validation failed", errors: detailedErrors });
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
      res.status(409).json({ message: "User already exists" });
      return;
    }

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(signUpData.password, 10);
    signUpData.password = hashedPassword;

    // Proceed with business logic if validation succeeds
    const newUser = userRepository.create(signUpData);
    await userRepository.save(newUser);

    res
      .status(201)
      .json({ message: "User registered successfully", user: signUpData });
  } catch (error) {
    console.error("Sign-up error:", error);
    res
      .status(500)
      .json({ message: "Failed to Sign up", error: error.message });
  }
});

// User login
router.post("/sign-in", async (req: Request, res: Response) => {
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
      data: detailedErrors
    })
    return;
  }

  // Check if email or phone number already exists
  const user = await userRepository.findOne({
    where: [
      { email: signInData.email }
    ],
  });

  if (!user) {
    Utility.sendResponse(res, {
      status: `failed`,
      message: `User does not exists`,
      code: 404
    })
    return;
  }

  const match = await bcrypt.compare(signInData.password, user.password)
  if (!match) {
    Utility.sendResponse(res, {
      status: `failed`,
      message: `Invalid login credentials`,
      code: 401,
    })
    return;
  }

  const data = {
    firstName: user.firstName,
    lasttName: user.lastName,
    userId: user.id,
  }
  const jwtSecretKey = process.env.JWT_SECRET
  const token = jwt.sign(data, jwtSecretKey)
  Utility.sendResponse(res, {
    status:`success`,
    message: `sign in successful`,
    code: 200,
    data: {
      ...user, token
    }
  })
});

// User logout
router.post("/sign-out", (req: Request, res: Response) => {
  res.status(200).json({ message: "sign-out endpoint" });
});

// Password reset
router.post("/request-password-reset", (req: Request, res: Response) => {
  // Sends a password reset email.
});

// Password reset
router.get("/reset-password", (req: Request, res: Response) => {
  // Resets the user's password.
});

// Verify email
router.post("/send-verification-email", (req: Request, res: Response) => {
  // send-verification-email
});
router.get("/verify-email", (req: Request, res: Response) => {
  // Verifies the user's email.
});

export default router;
