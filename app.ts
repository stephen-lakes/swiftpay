import "reflect-metadata";
import express, { Application, Request, Response, NextFunction } from "express";
import { logger } from "./src/utils/logger";
import dotenv from "dotenv";

dotenv.config();

class App {
  static PORT = process.env.PORT || 3000;
  private app: Application;

  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupErrorHandling();
    this.initialiseDataBase();
  }

  private initialiseDataBase() {}

  private setupMiddlewares() {
    this.app.use(express.json());
  }

  private setupRoutes() {
    this.app.get("/", (req: Request, res: Response) => {
      res.status(200).send("Swift---->pay");
    });

    this.app.get("/users", async (req: Request, res: Response) => {});

    this.app.post("/users", async (req: Request, res: Response) => {
      // Implement user creation logic
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

// Exporting the class for use in other modules
export default App;
