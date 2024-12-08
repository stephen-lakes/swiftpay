const express = require("express");
// Import your custom logger module

class App {
  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  setupMiddlewares() {
    // Example middleware setup (you can add more middlewares as needed)
    this.app.use(express.json());
    this.app.use((req, res, next) => {
      logger.info(`${req.method} ${req.originalUrl}`);
      next();
    });
  }

  setupRoutes() {
    // Define your routes here
    this.app.get("/", (req, res) => {
      res.send("Hello, world!");
    });
    // Add more routes as needed
  }

  setupErrorHandling() {
    // Global error handling middleware
    this.app.use((err, req, res, next) => {
      logger.error(
        `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
          req.method
        } - ${req.ip}`
      );
      res.status(err.status || 500).send("Something broke!");
    });
  }

  listen(port) {
    this.app.listen(port, () => {
      logger.info(`Server is running on port ${port}`);
    });
  }
}

// Exporting the class for use in other modules
module.exports = App;
