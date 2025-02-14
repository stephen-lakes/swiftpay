import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/jwt.config";

interface User {
  // Define your user properties here
  id: string;
  // Add other properties as needed
}

const authenticateJWT = (request: Request, response: Response, next: NextFunction): void => {
  const token = request.cookies[config.cookieName];
  if (!token) {
    return response.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      return response.status(403).json({ message: "Forbidden" });
    }
    request.user = user as User; // Attach user info to the request with appropriate type casting
    next();
  });
};

export default authenticateJWT;
