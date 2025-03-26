import { Entity, Column, Check, OneToMany } from "typeorm";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  MinLength,
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
  gender: string;

  @Column()
  dob: string;

  @Column()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Column()
  accountId: string;

  @Column({ default: "user" })
  role: string;

  @Column({ default: false })
  isVerified: boolean;

  @OneToMany(() => Transaction, (transaction) => transaction.sender)
  sentTransactions: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.recipient)
  receivedTransactions: Transaction[];
}
