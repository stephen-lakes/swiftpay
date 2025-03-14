import { Entity, Column } from "typeorm";

import { BaseEntity } from "./base.entity.ts";
import { IOTP } from "../interfaces/otp.interface.ts";

@Entity({ name: "otp" })
export class OTP extends BaseEntity implements IOTP {
  userId: string;

  @Column({ nullable: false })
  otp: string;

  @Column({ type: "timestamp", nullable: false })
  expirationDate: Date;
}
