import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config/jwt.config.ts";
import { User } from "../entities/user.entity.ts";



const authenticateJWT = (request: Request, response: Response, next: NextFunction): void | Response => {
  const token = request.cookies[config.cookieName];
  if (!token) {
    return response.status(401).json({ message: "Unauthorized" });
  }
  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      return response.status(403).json({ message: "Forbidden" });
    }
    // request.user = user as User; // Attach user info to the request with appropriate type casting
    next();
  });
};

export default authenticateJWT;
