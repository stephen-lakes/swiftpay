const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

let users = [];
let transactions = [];
const app = express();

app.use(express.json());

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
app.get("/", (req, res) => {
  console.log("Home Route Accessed");
  res.send("Hello WOrld!");
});

// User Registration/Sign-up Endpoint
app.post("/users/register", async (request, response) => {
  try {
    const { name, email, password } = request.body;
    if (!name || !email || !password)
      return response.status(400).json("name, email and password is required");

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    const newUser = {
      id: userId,
      name,
      email,
      password: hashedPassword,
      balance: 10000,
    };

    users = users.concat(newUser);

    response.status(201).json({ message: "user registered", user: newUser });
  } catch (error) {
    response.status(500).json({ error: "Failed to register user" });
  }
});

// User Login/Sing-in Endpoint
app.post("/users/login", async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password)
      return response
        .status(400)
        .json({ error: "email and password are required" });

    const user = users.find((user) => user.email === email);

    if (!user) return response.status(404).json({ error: "user not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return response.status(401).json({ error: "Invalid credentials" });

    const payload = user;
    const options = { expiresIn: "1h" }; // Token expiration time
    const token = jwt.sign(payload, process.env.JWT_SECRET, options);

    response.status(200).json({ message: "login successful", token });
  } catch (error) {
    response.status(500).json({ error: "failed to login user" });
  }
});

// User Endpoints
app.get("/users/balance", () => {});

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
  } catch (error) {
    response.status(500).json({ error: "Transaction Failed" });
  }
});

// Unknown Endpoint
app.use(unknownEndpoint);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
