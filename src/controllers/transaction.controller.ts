import { Request, Response, Router } from "express";
import { AppDataSource } from "../database.config.ts";
import { Transaction } from "../entities/transaction.entity.ts";
import { User } from "../entities/user.entity.ts";
import { TransactionStatus } from "../interfaces/transaction.interface.ts";

const transactionRepository = AppDataSource.getRepository(Transaction);
const userRepository = AppDataSource.getRepository(User);

const TransactionController = {
  getAll: async (req: Request, res: Response) => {
    const transactions = await transactionRepository.find({});
  },

  getRecent: async (req: Request, res: Response) => {
    const transactions = await transactionRepository.find({
      take: 5,
      order: {
        createdAt: "DESC",
      },
    });
  },

  getTransactionById: async (req: Request, res: Response) => {
    const transactionId = req.params.id;
    const transaction = await transactionRepository.findOneBy({
      id: transactionId,
    });
  },

  getTransactionByUserId: async (req: Request, res: Response) => {
    const userId = req.params.id;
    const transaction = await transactionRepository.find({
      where: {
        sender: await userRepository.findOneBy({ id: userId }),
        recipient: await userRepository.findOneBy({ id: userId }),
      },
    });
  },

  getSuccessfulTransactions: async (req: Request, res: Response) => {
    const transactions = await transactionRepository.find({
      where: { status: TransactionStatus.SUCCESSFUL },
    });
  },
};

export default TransactionController;
