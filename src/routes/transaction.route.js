const router = require("express").Router();

const {
  getAllTransactions,
  getTransactionById,
  getTransactionsByUserId,
  getSuccessfulTransactions,
  getFailedTransactions,
  getPendingTransactions,
  getSuccessfulTransactionsByUserId,
  getFailedTransactionsByUserId,
  getPendingTransactionsByUserId,
} = require("../controllers/transaction.controller");

router.get("/", getAllTransactions);
router.get("/:id", getTransactionById);
router.get("/users/:userId/", getTransactionsByUserId);
router.get("/success", getSuccessfulTransactions);
router.get("/failed", getFailedTransactions);
router.get("/pending", getPendingTransactions);
router.get("/users/:userId/success", getSuccessfulTransactionsByUserId);
router.get("/users/:userId/failed", getFailedTransactionsByUserId);
router.get("/users/:userId/pending", getPendingTransactionsByUserId);

module.exports = router;
