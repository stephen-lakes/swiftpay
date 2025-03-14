import { Check, Column } from "typeorm";
import { IAccount } from "../interfaces/account.interface.ts";
import { BaseEntity } from "./base.entity.ts";
import { IsNotEmpty } from "class-validator";

@Check(`"balance" >= 0`)
export class Account extends BaseEntity implements IAccount {
  @Column()
  @IsNotEmpty()
  userId: string;

  @Column()
  @IsNotEmpty()
  accountNumber: string;

  @Column()
  @IsNotEmpty()
  balance: number;

  @Column()
  @IsNotEmpty()
  currency: string;

  @Column()
  tierId?: string;
}
