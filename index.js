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

const app = express();
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
morgan.token("body", (req) => JSON.stringify(req.body));

const unknownEndpoint = (request, response) => {
  return response.status(404).json({ error: "unknown endpoint" });
};

const authenticateToken = (request, response, next) => {
  const token = request.header("Authorization");
  if (!token) return response.status(401).json({ error: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) return response.status(403).json({ error: "Invalid Token" });

    request.user = user; // Attach user info to the request
    next();
  });
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
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (request, response) => {
  response.status(200).json({ message: "Welcome to Swift---->pay" });
});

// User Balance Endpoints
// app.get("/users/balance", () => {});

// Retrieve All transactions
// app.get("/transactions", (request, response) => {
//   response.status(200).json({ transactions: transactions });
// });

// User Transaction History
// app.get("/transactions/history", (request, response) => {
//   const userId = request.user.id; // get user id from the token
//   try {
//     const transactions = transactions.find(
//       (transaction) =>
//         transaction.senderId === userId || transaction.receiverId === userId
//     );
//     response.status(200).json({ transactions });
//   } catch (error) {
//     response.status(500).json({ error: "Failed to fetch Transactions" });
//   }
// });

// Send Money Endpoint
// app.post("/transactions/send", authenticateToken, async (request, response) => {
//   const { receiverId, amount } = request.body;
//   const senderId = request.user.id; // Get user ID from the token
//   try {
//     const sender = users.find((user) => user.id === senderId);
//     const receiver = users.find((user) => user.id === receiverId);
//     if (!receiver)
//       return response.status(404).json({ error: "Receiver not Found" });

//     sender.balance -= amount;
//     receiver.balance += amount;

//     const transaction = {
//       id: uuidv4(),
//       senderId,
//       receiverId,
//       amount,
//       timestamp: new Date(),
//     };

//     transactions = transactions.concat(transaction);
//   } catch (error) {
//     response.status(500).json({ error: "Transaction Failed" });
//   }
// });

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
