import "reflect-metadata";
import express, { Application, Request, Response, NextFunction } from "express";
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

  private setupMiddlewares() {}

  private setupRoutes() {}

  private setupErrorHandling() {
    
  }

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
