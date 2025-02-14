import dotenv from "dotenv";
dotenv.config();

const config = {
  jwtSecret: process.env.JWT_SECRET as string,
  jwtExpiresIn: "1h", // Token expiration time
  cookieName: "auth_token",
  cookieOptions: {
    httpOnly: true, // Prevents client-side script access
    secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
    maxAge: 3600000, // 1 hour in milliseconds
  },
};

export default config;
