const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const morgan = require("morgan");
require("dotenv").config();

const connectDB = require("./src/services/database.service");

const AuthRoute = require("./src/routes/auth.route");
const UserRoute = require("./src/routes/user.route");

let users = [];
// let transactions = [];
const transactions = [
  {
    id: "02bb0404-334b-4f63-b9aa-cf6fcbbd4316",
    senderId: "178f0258-2ae7-431f-9f37-ce67101200f7",
    receiverId: "8f961178-764e-4c1e-b5c6-557da1ac223a",
    amount: 5000,
    description: "Payment for services",
    timestamp: "2021-03-02T18:22:47.974Z",
  },
  {
    id: "b38d41cf-a238-4e53-8a71-7e0345b6807e",
    senderId: "d328c76f-6059-4171-8464-7a481d3e632a",
    receiverId: "4b7f1c48-a2e4-4b3a-b476-1da7b98c5e2b",
    amount: 4500,
    description: "Payment for services",
    timestamp: "2022-04-18T04:44:22.676Z",
  },
  {
    id: "f71b58e2-4687-4abf-850f-64ab9a601d3d",
    senderId: "9b8e3f4e-5b65-4f4c-9964-1a44c8d32aa7",
    receiverId: "178f0258-2ae7-431f-9f37-ce67101200f7",
    amount: 12000,
    description: "Payment for services",
    timestamp: "2021-06-27T14:54:40.441Z",
  },
  {
    id: "497b2d26-ff4c-4e7b-a63b-9295f3c15412",
    senderId: "6c8b2e79-b926-4e4f-90b9-0658bb093729",
    receiverId: "1d5986a6-8e14-4c11-b6b1-3f65d9f22a9a",
    amount: 3000,
    description: "Payment for services",
    timestamp: "2023-06-09T10:19:57",
  },
  {
    id: "c3da4e8f-bfd9-4919-8f24-5c442e037128",
    senderId: "178f0258-2ae7-431f-9f37-ce67101200f7",
    receiverId: "e5b58f90-5b98-4c65-98e5-1c9b4bbf0d68",
    amount: 7500,
    description: "Payment for services",
    timestamp: "2024-07-14T17:09:41.815Z",
  },
];

const app = express();
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);
morgan.token("body", (req) => JSON.stringify(req.body));
app.get("/api/persons", (request, response) => {
  response.send(persons);
});

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

app.get("/", (req, res) => {
  console.log("Home Route Accessed");
  res.send("Hello WOrld!");
});

// User Balance Endpoints
app.get("/users/balance", () => {});

// Retrieve All transactions
app.get("/transactions", (request, response) => {
  response.status(200).json({ transactions: transactions });
});

// User Transaction History
app.get("/transactions/history", (request, response) => {
  const userId = request.user.id; // get user id from the token
  try {
    const transactions = transactions.find(
      (transaction) =>
        transaction.senderId === userId || transaction.receiverId === userId
    );
    response.status(200).json({ transactions });
  } catch (error) {
    response.status(500).json({ error: "Failed to fetch Transactions" });
  }
});

// Send Money Endpoint
app.post("/transactions/send", authenticateToken, async (request, response) => {
  const { receiverId, amount } = request.body;
  const senderId = request.user.id; // Get user ID from the token
  try {
    const sender = users.find((user) => user.id === senderId);
    const receiver = users.find((user) => user.id === receiverId);
    if (!receiver)
      return response.status(404).json({ error: "Receiver not Found" });

    sender.balance -= amount;
    receiver.balance += amount;

    const transaction = {
      id: uuidv4(),
      senderId,
      receiverId,
      amount,
      timestamp: new Date(),
    };

    transactions = transactions.concat(transaction);
  } catch (error) {
    response.status(500).json({ error: "Transaction Failed" });
  }
});

// Unknown Endpoint
app.use(unknownEndpoint);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // connect to DB
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
