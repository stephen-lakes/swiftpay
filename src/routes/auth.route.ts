import express, { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { SignUpDto, SignInDto } from "../dtos/auth.dto.ts";
import { validate } from "class-validator";
import { User } from "../entities/user.entity.ts";
import { AppDataSource } from "../database.config.ts";
import { ResponseType, Utility } from "../utils/utilities.ts";
import AuthController from "../controllers/auth.controller.ts";

const router: Router = express.Router();
const userRepository = AppDataSource.getRepository(User);

router.post("/", (req: Request, res: Response) => {
  const data: ResponseType = {
    status: `success`,
    message: `AUTH endpoint`,
    code: 200,
  };
  Utility.sendResponse(res, data);
});

// User Registration
router.post("/sign-up", AuthController.signup);

// User login
router.post("/sign-in", AuthController.signin);

// User logout
router.post("/sign-out", AuthController.signout);

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
