import { Entity, Column, Check, OneToMany } from "typeorm";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  MinLength,
  Min,
} from "class-validator";

import { BaseEntity } from "./base.entity.ts";
import { Transaction } from "./transaction.entity.ts";
import { IUser } from "../interfaces/user.interface.ts";

@Entity({ name: "user" })
@Check(`"balance" >= 0`)
export class User extends BaseEntity implements IUser {
  @Column()
  @IsNotEmpty()
  @Length(2, 30)
  firstName: string;

  @Column()
  @IsNotEmpty()
  @Length(2, 30)
  lastName: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsOptional()
  @Length(10, 15)
  phoneNumber?: string;

  @Column()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  @Min(0)
  balance: number;

  @Column({ default: "user" })
  role: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  otp?: string;

  @Column({ type: "timestamp", nullable: true })
  otpExpiresAt?: Date;

  @OneToMany(() => Transaction, (transaction) => transaction.sender)
  sentTransactions: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.recipient)
  receivedTransactions: Transaction[];
}
