const express = require("express");

require("dotenv").config();

const router = express.Router();

const { register, login, logout } = require("../controllers/auth.controller");

// User Registration
router.post("/register", register);

// User login
router.post("/login", login);

// User logout
router.post("/logout", logout);

module.exports = router;
