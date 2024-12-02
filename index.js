const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();

const connectDB = require("./src/services/database.service");
const swaggerSpec = require("./swagger");

const AuthRoute = require("./src/routes/auth.route");
const UserRoute = require("./src/routes/user.route");
const TransactionRoute = require("./src/routes/transaction.route");
const SendMoneyRoute = require("./src/routes/sendMoney.route");

const app = express();
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
morgan.token("body", (req) => JSON.stringify(req.body));

const unknownEndpoint = (request, response) => {
  return response.status(404).json({ error: "unknown endpoint" });
};

// Error-handling middleware for JSON parsing errors
app.use((error, request, response, next) => {
  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    console.log(`bad JSON: ${error.message}`);
    response.status(400).json({ error: "invalid JSON format" });
  }
  next();
});

app.use("/auth", AuthRoute);
app.use("/users", UserRoute);
app.use("/transactions", TransactionRoute);
app.use("/send-money", SendMoneyRoute);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (request, response) => {
  response.status(200).json({ message: "Welcome to Swift---->pay" });
});

// Unknown Endpoint
app.use(unknownEndpoint);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // connect to DB
  connectDB();
  console.log(`Server running on port ${PORT}`);
  if (process.env.ENV === "dev")
    console.log(
      `Swiftpay docs is available at ${process.env.BASE_URL}:${process.env.PORT}/api-docs`
    );
});
