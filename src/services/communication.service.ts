import nodemailer from "nodemailer";
import { authenticator } from "otplib";
import crypto from "crypto";

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  text: string;
}

const createTransporter = () => {
  const { EMAIL_SERVICE_PROVIDER, EMAIL_USER, EMAIL_PASS } = process.env;
  if (!EMAIL_SERVICE_PROVIDER || !EMAIL_USER || !EMAIL_PASS) {
    throw new Error(
      "Missing required environment variables for email configuration."
    );
  }
  return nodemailer.createTransport({
    service: EMAIL_SERVICE_PROVIDER,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });
};

const generateOTP = (): string => {
  const secret = authenticator.generateSecret();
  return authenticator.generate(secret);
};

const setOTPExpirationDate = (): Date => new Date(Date.now() + 10 * 60 * 1000);

const sendOtpToEmail = async (email: string, OTP: string): Promise<void> => {
  try {
    const transporter = createTransporter();
    const mailOptions: MailOptions = {
      from: process.env.EMAIL_USER!,
      to: email,
      subject: "Verify Your Email",
      text: `Your OTP is ${OTP}. It expires in 10 minutes.`,
    };
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}`);
  } catch (error) {
    console.error(`Error sending OTP to ${email}:`, error);
  }
};

/**
 * Generates a unique token for password reset.
 * @returns {string} - The generated token.
 */
function generateResetToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

const sendPasswordResetLink = async (
  email: string,
  title: string,
  link: string
): Promise<void> => {
  try {
    const transporter = createTransporter();
    const mailOptions: MailOptions = {
      from: process.env.EMAIL_USER!,
      to: email,
      subject: `${title}`,
      text: `Reset your password by clicking on the link: ${link}`,
    };
    await transporter.sendMail(mailOptions);
    console.log(`Password reset email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending password reset link to ${email}:`, error);
  }
};

const generatePasswordResetLink = async (
  request: any,
  response: any
): Promise<void> => {
  const { email } = request.body;

  // Generate a reset token (JWT or unique string)
  const token = generateResetToken();
  const title = "Password Reset";
  const link = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  await sendPasswordResetLink(email, title, link);

  response.status(200).json({ message: "Password reset email sent" });
};

const CommunicationService = {
  createTransporter,
  generateOTP,
  setOTPExpirationDate,
  sendOtpToEmail,
  generateResetToken,
  sendPasswordResetLink,
};

export default CommunicationService;
