import express, { Request, Response } from "express";

const router = express.Router();

router.post("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "AUTH endpoint" });
});
// User Registration
router.post("/sign-up", (req: Request, res: Response) => {
  res.status(200).json({ message: "sign-up endpint" });
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
