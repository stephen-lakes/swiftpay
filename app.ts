import "reflect-metadata";
import express, { Application, Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";
import { logger } from "./src/utils/logger";

dotenv.config();

class App {
  static PORT = process.env.PORT || 3000;
  private app: Application;

  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupErrorHandling();
    this.initializeDatabase();
  }

  private initializeDatabase() {}

  private setupMiddlewares() {
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(
      morgan(`:method :url :status :res[content-length] - :response-time ms`)
    );
  }

  private setupRoutes() {
    this.app.get("/", (request, response) => {
      response.status(200).json({ message: `Welcome to Swift---->pay` });
    });
  }

  private setupErrorHandling() {}

  public listen() {
    this.app.listen(App.PORT, () => {
      logger.info(`
=================================
=================================
          Swift---->pay
🚀 Server running on port ${App.PORT} 🚀
${process.env.ENV} mode  ${new Date().toLocaleTimeString()}
=================================
=================================
      `);

      if (process.env.ENV === "dev") {
        logger.info(
          `Swiftpay docs are available at ${process.env.BASE_URL}:${App.PORT}/api-docs`
        );
      }
    });
  }
}

export default App;
