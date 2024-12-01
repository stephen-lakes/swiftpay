const Transaction = require("../models/transaction.model");

const getAllTransactions = async (request, response) => {
  try {
    const transactions = await Transaction.find();
    response.status(200).json({ message: "SUCCESS", data: transactions });
  } catch (error) {
    response.status(500).json({ message: "Failed to fecth transactions" });
  }
};

const getTransactionById = async (request, response) => {
  const { id } = request.params;
  try {
    const transaction = Transaction.findById(id);
    if (transaction)
      response.status(200).json({ message: "SUCCESS", data: transaction });
    else response.status(404).json({ message: "Transaction not found" });
  } catch (error) {
    response.status(500).json({ message: "Failed to fecth transaction" });
  }
};

const getTransactionsByUserId = async (request, response) => {
  const { userId } = req.params;
  try {
    const transactions = await Transaction.find({ senderId: userId });
    if (transactions.length > 0)
      response.status(200).json({ message: "SUCCESS", data: trasactions });
    else
      response
        .status(404)
        .json({ message: "No transaction found for the user" });
  } catch (error) {
    response.status(500).json({ message: "Failed to fecth transactions" });
  }
};

const getSuccessfulTransactions = async (request, response) => {
  try {
    const transactions = await Transaction.find({ status: "completed" });
    if (transactions.length > 0)
      response.status(200).json({ message: "SUCCESS", data: transactions });
    else
      response
        .status(404)
        .json({ message: "No successful transactions found" });
  } catch (error) {
    response.status(500).json({ message: "Failed to fecth transactions" });
  }
};

const getFailedTransactions = async (request, response) => {
  try {
    const transactions = await Transaction.find({ status: "failed" });
    if (transactions.length > 0)
      response.status(200).json({ message: "SUCCESS", data: transactions });
    else response.status(404).json({ message: "No failed transactions found" });
  } catch (error) {
    response.status(500).json({ message: "Failed to fecth transactions" });
  }
};

const getPendingTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ status: "pending" });
    if (transactions.length > 0) {
      res.status(200).json({ message: "SUCCESS", data: transactions });
    } else {
      res.status(404).json({ message: "No pending transactions found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};

const getSuccessfulTransactionsByUserId = async (request, response) => {
  const { userId } = request.params;
  try {
    const transactions = await Transaction.find({
      status: "success",
      senderId: userId,
    });
    if (transactions.length > 0)
      response.status(200).json({ message: "SUCCESS", data: transactions });
  } catch (error) {
    response.status(500).status({ message: "Failed to fetch transactions" });
  }
};

const getPendingTransactionsByUserId = async (request, response) => {
  const { userId } = request.params;
  try {
    const transactions = await Transaction.find({
      status: "pending",
      senderId: userId,
    });
    if (transactions.length > 0)
      response.status(200).json({ message: "SUCCESS", data: transactions });
    else
      response
        .status(404)
        .json({ message: "No pending transactions found for the user" });
  } catch (error) {
    response.status(500).json({ message: "Failed to fetch transactions" });
  }
};

module.exports = router;

module.exports = {
  getAllTransactions,
  getTransactionById,
  getTransactionsByUserId,
  getSuccessfulTransactions,
  getFailedTransactions,
  getPendingTransactions,
};
