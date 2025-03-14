import { Check, Column, Entity } from "typeorm";
import { IAccount } from "../interfaces/account.interface.ts";
import { BaseEntity } from "./base.entity.ts";
import { Min } from "class-validator";

@Entity({ name: "account" })
@Check(`"balance" >= 0`)
export class Account extends BaseEntity implements IAccount {
  @Column()
  userId: string;

  @Column()
  accountNumber: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0.0 })
  @Min(0)
  balance: number;

  @Column()
  currency?: string;

  @Column()
  tierId?: string;
}
