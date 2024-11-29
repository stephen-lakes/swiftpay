const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const router = express.Router();

const User = require("../models/user.model");
const { register, login, logout } = require("../controllers/auth.controller");

// User Registration
router.post("/register", register);

// User login
router.post("/login", login);

// User logout
router.post("/logout", logout);

module.exports = router;
