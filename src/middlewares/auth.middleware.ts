import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import config from "../config/jwt.config.ts";

declare module "express-serve-static-core" {
    interface Request {
        userId?: string;
    }
}

const authenticateUser = (request: Request, response: Response, next: NextFunction): void => {
  const authHeader = request.headers['authorization'];
  if (!authHeader) {
      response.status(401).json({ message: "Unauthorized" });
      return;
  }

  // Extract the token from the 'Bearer <token>' format
  const token = authHeader.split(' ')[1]; 
  if (!token) {
      response.status(401).json({ message: "Unauthorized" });
      return;
  }

  jwt.verify(token, config.jwtSecret, (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
      if (err) {
          response.status(403).json({ message: "Forbidden" });
          return;
      }

      if (typeof decoded === "object" && decoded !== null) {
          // Attach userId to the request object
          request.userId = (decoded as { userId: string }).userId; 
      }
      next();
  });
};


export default authenticateUser;
