import { User } from "../entities/user.entity.ts";

export enum TransactionStatus {
  PENDING = "pending",
  SUCCESSFUL = "successful",
  FAILED = "failed",
}

export enum TransactionType {
  DEPOSIT = "deposit",
  WITHDRAWAL = "withdrawal",
  TRANSFER = "transfer",
}

export interface ITransaction {
  id: string;
  sender: User;
  recipient: User;
  type: TransactionType;
  amount: number;
  currency?: string;
  remark?: string;
  status: TransactionStatus;
}
