import "reflect-metadata";
import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";
// import { logger } from "./utils/logger";
// import swaggerUi from "swagger-ui-express";
// import swaggerSpec from "../swagger";

// import authRouter from "./routes/auth.route";
// import userRouter from "./routes/user.route";
// import TransactionRoute from "./routes/transaction.route";
// import SendMoneyRoute from "./routes/sendMoney.route";
import { Any } from "typeorm";
import { AppDataSource } from "./config/database.config.ts";
import { logger } from "./utils/logger.ts";
// import { AppDataSource } from "./config/database.config";

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

  private async initializeDatabase() {
    try {
      const conn = await AppDataSource.initialize();
      logger.info(`Data source has been initialazed`);
      await conn.runMigrations();
      logger.info(`Migrations run successfully`);
    } catch (err) {
      logger.error(`Error initializing data source ${err}`);
    }

    // AppDataSource.initialize()
    //   .then(() => logger.info(`Data source has been initialazed`))
    //   .catch((err) => logger.error(`Error initializing data source ${err}`));
  }

  private setupMiddlewares() {
    // this.app.use((error, request, response, next) => {
    //   if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    //     console.log(`bad JSON: ${error.message}`);
    //     response.status(400).json({ error: "invalid JSON format" });
    //   }
    //   next();
    // });

    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use(
      morgan(`:method :url :status :res[content-length] - :response-time ms`)
    );
  }

  private setupRoutes() {
    this.app.get("/", (request: Request, response: Response) => {
      response.status(200).json({ message: `Welcome to Swift---->pay` });
    });

    // this.app.use("/api/auth", authRouter);
    // this.app.use("/api/users", userRouter);
    // this.app.use("/transactions", TransactionRoute);
    // this.app.use("/send-money", SendMoneyRoute);
    // this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    const unknownEndpoint = (request: Request, response: Response) => {
      response.status(404).json({ error: "unknown endpoint" });
    };

    this.app.use(unknownEndpoint);
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
