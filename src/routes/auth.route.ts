import express, { Request, response, Response, Router } from "express";
import { SignUpDto } from "../dtos/auth.dto.ts";
import { validate } from "class-validator";
import { User } from "../entities/user.entity.ts";
import { AppDataSource } from "../config/database.config.ts";

const router: Router = express.Router();

router.post("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "AUTH endpoint" });
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
    // Proceed with business logic if validation succeeds
    AppDataSource.getRepository(User);

    const userRepository = AppDataSource.getRepository(User);
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
router.post("/sign-in", (req: Request, res: Response) => {
  res.status(200).json({ message: "sign-in endpint" });
});

// User logout
router.post("/sign-out", (req: Request, res: Response) => {
  res.status(200).json({ message: "sign-out endpint" });
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
