// const Transaction = require("../models/transaction.model");
//
// const getAllTransactions = async (request, response) => {
//   const { startDate, endDate } = request.query;
//   let filter = {};
//
//   if (startDate && endDate)
//     filter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
//   else if (startDate) filter.createdAt = { $gte: new Date(startDate) };
//   else if (endDate) filter.createdAt = { $lte: new Date(endDate) };
//
//   try {
//     const transactions = await Transaction.find(filter);
//     response.status(200).json({ message: "SUCCESS", data: transactions });
//   } catch (error) {
//     response.status(500).json({ message: "Failed to fecth transactions" });
//   }
// };
//
// const getTransactionById = async (request, response) => {
//   const { id } = request.params;
//   try {
//     const transaction = Transaction.findById(id);
//     if (transaction)
//       response.status(200).json({ message: "SUCCESS", data: transaction });
//     else response.status(404).json({ message: "Transaction not found" });
//   } catch (error) {
//     response.status(500).json({ message: "Failed to fecth transaction" });
//   }
// };
//
// const getTransactionsByUserId = async (request, response) => {
//   const { userId } = request.params;
//   const { startDate, endDate } = request.query;
//   let filter = { senderId: userId };
//
//   if (startDate && endDate)
//     filter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
//   else if (startDate) filter.createdAt = { $gte: new Date(startDate) };
//   else if (endDate) filter.createdAt = { $lte: new Date(endDate) };
//
//   try {
//     const transactions = await Transaction.find(filter);
//     if (transactions.length > 0)
//       response.status(200).json({ message: "SUCCESS", data: transactions });
//     else
//       response
//         .status(404)
//         .json({ message: "No transaction found for the user" });
//   } catch (error) {
//     response.status(500).json({ message: "Failed to fecth transactions" });
//   }
// };
//
// const getSuccessfulTransactions = async (request, response) => {
//   const { startDate, endDate } = request.query;
//   let filter = { status: "completed" };
//
//   if (startDate && endDate)
//     filter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
//   else if (startDate) filter.createdAt = { $gte: new Date(startDate) };
//   else if (endDate) filter.createdAt = { $lte: new Date(endDate) };
//
//   try {
//     const transactions = await Transaction.find(filter);
//     if (transactions.length > 0)
//       response.status(200).json({ message: "SUCCESS", data: transactions });
//     else
//       response
//         .status(404)
//         .json({ message: "No successful transactions found" });
//   } catch (error) {
//     response.status(500).json({ message: "Failed to fecth transactions" });
//   }
// };
//
// const getFailedTransactions = async (request, response) => {
//   const { startDate, endDate } = request.query;
//   let filter = { status: "failed" };
//
//   if (startDate && endDate)
//     filter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
//   else if (startDate) filter.createdAt = { $gte: new Date(startDate) };
//   else if (endDate) filter.createdAt = { $lte: new Date(endDate) };
//
//   try {
//     const transactions = await Transaction.find(filter);
//     if (transactions.length > 0)
//       response.status(200).json({ message: "SUCCESS", data: transactions });
//     else response.status(404).json({ message: "No failed transactions found" });
//   } catch (error) {
//     response.status(500).json({ message: "Failed to fecth transactions" });
//   }
// };
//
// const getPendingTransactions = async (request, response) => {
//   const { startDate, endDate } = request.query;
//   let filter = { status: "pending" };
//
//   if (startDate && endDate)
//     filter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
//   else if (startDate) filter.createdAt = { $gte: new Date(startDate) };
//   else if (endDate) filter.createdAt = { $lte: new Date(endDate) };
//
//   try {
//     const transactions = await Transaction.find(filter);
//     if (transactions.length > 0) {
//       response.status(200).json({ message: "SUCCESS", data: transactions });
//     } else {
//       response.status(404).json({ message: "No pending transactions found" });
//     }
//   } catch (error) {
//     response.status(500).json({ message: "Failed to fetch transactions" });
//   }
// };
//
// const getSuccessfulTransactionsByUserId = async (request, response) => {
//   const { userId } = request.params;
//   const { startDate, endDate } = request.query;
//
//   let filter = { status: "success", senderId: userId };
//
//   if (startDate && endDate)
//     filter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
//   else if (startDate) filter.createdAt = { $gte: new Date(startDate) };
//   else if (endDate) filter.createdAt = { $lte: new Date(endDate) };
//
//   try {
//     const transactions = await Transaction.find(filter);
//     if (transactions.length > 0)
//       response.status(200).json({ message: "SUCCESS", data: transactions });
//   } catch (error) {
//     response.status(500).status({ message: "Failed to fetch transactions" });
//   }
// };
//
// const getPendingTransactionsByUserId = async (request, response) => {
//   const { userId } = request.params;
//   const { startDate, endDate } = request.query;
//
//   let filter = { status: "pending", senderId: userId };
//
//   if (startDate && endDate)
//     filter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
//   else if (startDate) filter.createdAt = { $gte: new Date(startDate) };
//   else if (endDate) filter.createdAt = { $lte: new Date(endDate) };
//
//   try {
//     const transactions = await Transaction.find(filter);
//     if (transactions.length > 0)
//       response.status(200).json({ message: "SUCCESS", data: transactions });
//     else
//       response
//         .status(404)
//         .json({ message: "No pending transactions found for the user" });
//   } catch (error) {
//     response.status(500).json({ message: "Failed to fetch transactions" });
//   }
// };
//
// const getFailedTransactionsByUserId = async (request, response) => {
//   const { userId } = request.params;
//   const { startDate, endDate } = request.query;
//
//   let filter = { status: "failed", senderId: userId };
//
//   if (startDate && endDate)
//     filter.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
//   else if (startDate) filter.createdAt = { $gte: new Date(startDate) };
//   else if (endDate) filter.createdAt = { $lte: new Date(endDate) };
//
//   try {
//     const transactions = await Transaction.find(filter);
//     if (transactions.length > 0)
//       response.status(200).json({ message: "SUCCESS", data: transactions });
//     else
//       response
//         .status(404)
//         .json({ messaeg: "No failed transactions found for the user" });
//   } catch (error) {
//     response.status(500).json({ message: "Failed to fetch transactions" });
//   }
// };
//
// module.exports = {
//   getAllTransactions,
//   getTransactionById,
//   getTransactionsByUserId,
//   getSuccessfulTransactions,
//   getFailedTransactions,
//   getPendingTransactions,
//   getSuccessfulTransactionsByUserId,
//   getFailedTransactionsByUserId,
//   getPendingTransactionsByUserId,
// };


import { Request, Response, Router } from "express";
import { User } from "../entities/user.entity.ts";
import { AppDataSource } from "../config/database.config.ts";
import { Utility } from "../utils/utilities.ts";
import { EntityManager } from "typeorm";

const userRepository = AppDataSource.getRepository(User);

const TransactionController = {
    getAll: async () => {

    },

    getTransactionById: async () => {

    },
    

}
