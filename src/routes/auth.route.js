const express = require("express");
const router = express.Router();

const User = require("../models/user.model");

const User = require("../models/user.model");

// User Registration
router.post("/register", async (request, response) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = request.body;
    if (!firstName || !lastName || !phoneNumber || !email || !password)
      return response
        .status(400)
        .json(
          "firstName, lastName, phoneNumber, email and password are required"
        );

    // Check if users already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return response.status(400).json({ message: "User already exists" });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const _id = uuidv4();
    const newUser = {
      _id,
      firstName,
      lastName,
      phoneNumber,
      email,
      password: hashedPassword,
      balance: 10000,
    };

    // Save new user to the database
    await newUser.save();

    response
      .status(201)
      .json({ message: "user registered successfully", user: newUser });
  } catch (error) {
    response.status(500).json({ error: "Failed to register user" });
  }
});

// User login
router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;

    if (!email || !password)
      return response
        .status(400)
        .json({ error: "email and password are required" });

    // Find the user by email
    const user = User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return response.status(401).json({ error: "Invalid email or password" });

    const payload = user;
    const options = { expiresIn: "1h" };
    // Generate a JWT token
    const token = jwt.sign(payload, process.env.JWT_SECRET, options);

    response.status(200).json({ message: "login successful", token });
  } catch (error) {
    response.status(500).json({ error: "failed to login user" });
  }
});

// User logout
router.post("/logout", (req, res) => {
  // Invalidate the token (implementation depends on your token management strategy)
  res.status(200).json({ message: "User logged out successfully" });
});
