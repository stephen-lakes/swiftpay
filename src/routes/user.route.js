const router = require("express").Router();

const {
  getUserByEmail,
  getUserByID,
  getUserByPhoneNumber,
  getAllUsers,
} = require("../controllers/user.controller");

router.get("/", getAllUsers);
router.get("/:id", getUserByID);
router.get("/phone/:phoneNumber", getUserByPhoneNumber);
router.get("/email/:email", getUserByEmail);

module.exports = router;
