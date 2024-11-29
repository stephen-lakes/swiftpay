const router = require("express").Router();

const {
  getUserByEmail,
  getUserByID,
  getUserByPhoneNumber,
  getAllUsers,
} = require("../controllers/user.controller");

router.get("/users", getAllUsers);
router.get("/users/:id", getUserByID);
router.get("/user/phone/:phoneNumber", getUserByPhoneNumber);
router.get("/user/email/:email", getUserByEmail);
