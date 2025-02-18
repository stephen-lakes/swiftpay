import { User } from "../entities/user.entity.ts";

export enum TransactionStatus {
  PENDING = "pending",
  SUCCESSFUL = "successful",
}

export interface ITransaction {
  id: string;
  sender: User;
  recipient: User;
  amount: number;
  remark?: string;
  status: TransactionStatus;
}
