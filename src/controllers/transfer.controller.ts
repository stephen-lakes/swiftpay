import { Request, Response, Router } from "express";
import { User } from "../entities/user.entity.ts";
import { AppDataSource } from "../database.config.ts";
import { Utility } from "../utils/utilities.ts";
import { EntityManager } from "typeorm";
import { Transaction } from "../entities/transaction.entity.ts";
import { TransactionStatus } from "../interfaces/transaction.interface.ts";

const userRepository = AppDataSource.getRepository(User);
const transactionRepository = AppDataSource.getRepository(Transaction);

const TransferController = {
  transfer: async (req: Request, res: Response) => {
    try {
      const userId = req.userId;
      const { amount, email, phoneNumber, remark } = req.body;

      if (!email && !phoneNumber) {
        return Utility.sendResponse(res, {
          status: `failed`,
          message: `Email or Phone number is required`,
          code: 400,
        });
      }

      const [recipient, sender] = await Promise.all([
        userRepository.findOne({ where: { email, phoneNumber } }),
        userRepository.findOne({ where: { id: userId } }),
      ]);

      if (!recipient) {
        return Utility.sendResponse(res, {
          status: `failed`,
          message: `Recipient not found`,
          code: 404,
        });
      }

      if (!sender) {
        return Utility.sendResponse(res, {
          status: `failed`,
          message: `Sender not found`,
          code: 404,
        });
      }

      // Check if the sender is trying to send to themselves
      if (sender.id === recipient.id) {
        return Utility.sendResponse(res, {
          status: `failed`,
          message: `You cannot send funds to yourself`,
          code: 400,
        });
      }

      if (sender.balance < amount) {
        return Utility.sendResponse(res, {
          status: `failed`,
          message: `Insufficient funds`,
          code: 400,
        });
      }

      let transaction: Transaction;

      // Perform the transfer within a transaction
      await AppDataSource.transaction(
        async (transactionalEntityManager: EntityManager) => {
          sender.balance = parseFloat(sender.balance.toString()) - amount;
          recipient.balance = parseFloat(recipient.balance.toString()) + amount;

          await transactionalEntityManager.save(sender);
          await transactionalEntityManager.save(recipient);

          // Create and save the transaction
          transaction = transactionRepository.create({
            sender,
            recipient,
            amount,
            remark,
            status: TransactionStatus.PENDING,
          });
          await transactionalEntityManager.save(transaction);
        }
      );

      if (!transaction) {
        throw new Error("Transaction creation failed");
      }

      // Update the transaction status to "successful"
      transaction.status = TransactionStatus.SUCCESSFUL;
      await transactionRepository.save(transaction);

      Utility.sendResponse(res, {
        status: `success`,
        message: `Transfer successful`,
        code: 200,
        data: {
          amount,
          remark,
        },
      });
    } catch (error) {
      console.error("Error during transfer:", error);
      Utility.sendResponse(res, {
        status: "failed",
        message: "An error occurred",
        code: 500,
      });
    }
  },
};

export default TransferController;
