import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity.ts";
import { User } from "./user.entity.ts";
import {
  ITransaction,
  TransactionStatus,
} from "../interfaces/transaction.interface.ts";

@Entity({ name: "transaction" })
export class Transaction extends BaseEntity implements ITransaction {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.sentTransactions)
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedTransactions)
  recipient: User;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount: number;

  @Column({ nullable: true })
  remark?: string;

  @Column({
    type: "enum",
    enum: TransactionStatus,
    default: TransactionStatus.PENDING,
  })
  status: TransactionStatus;
}
