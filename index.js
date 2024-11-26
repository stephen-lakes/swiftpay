const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let users = [];
const app = express();

app.use(express.json());

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
app.post("/users/register", (request, response) => {
  try {
    const { name, email, password } = request.body;
    if (!name || !email || !password)
      return response.status(400).json("name, email and password is required");

    const hashedPassword = bcrypt.hash(password, 10);
    const newUser = { name, email, balance: 10000 };

    users = users.concat(newUser);

    response.status(201).json({ message: "user registered", user: newUser });
  } catch (error) {
    response.status(500).json({ error: "Failed to register user" });
  }
});

// User Login/Sing-in Endpoint
app.post("/users/login", (request, response) => {
  const { email, password } = request.body;

  if (!email || !password)
    return response
      .status(400)
      .json({ error: "email and password are required" });

  const user = users.find((user) => user.email === email);

  if (!user) return response.status(404).json({ error: "user not found" });

  const isPasswordValid = bcrypt.compare(password, user.password);
  if (!isPasswordValid)
    return response.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { email: user.email },
    "3gewyvh436437t372u[0328bg432vft2r",
    { expiresIn: "1h" }
  );
  response.status(200).json({ message: "login successful", token });
});

// User Endpoints
app.get("/users/balance", () => {});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port 3000`);
});
