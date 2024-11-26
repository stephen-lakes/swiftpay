const express = require("express");
const bcrypt = require("bcryptjs");

let users = [];
const app = express();

app.use(express.json());
app.get("/", (req, res) => {
  console.log("Home Route Accessed");
  res.send("Hello WOrld!");
});

// User Registration/Sign-up Endpoint
app.post("/users/register", (request, response) => {
  try {
    const { name, email, password } = request.body;
    if (!name || !email || !password)
      response.status(400).json("name, email and password is required");
    const hashedPassword = bcrypt.hash(password, 10);
    const newUser = { name, email, balance: 10000 };

    users = users.concat(newUser);

    response.status(201).json({ message: "user registered", user: newUser });
  } catch (error) {
    response.status(500).json({ error: "Failed to register user" });
  }
});

// User Login/Sing-in Endpoint
app.post("/users/login", () => {});

// User Endpoints
app.get("/users/balance", () => {});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port 3000`);
});
