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

const getTransactionsByUserId = async (request, response) => {};

const getSuccessfulTransactions = async (request, response) => {};

const getFailedTransactions = async (request, response) => {};

module.exports = {
  getAllTransactions,
  getTransactionById,
  getTransactionsByUserId,
  getSuccessfulTransactions,
  getFailedTransactions,
};
