import { Entity, Column } from "typeorm";
import { BaseEntity } from "./base.entity";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  password: string;
  balance: number;
  role: string;
  isVerified: boolean;
  otp?: string;
  otpExpiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

@Entity({ name: "users" })
export class UserEntity extends BaseEntity implements User {
  @Column({ type: "varchar", nullable: false })
  firstName: string;

  @Column({ type: "varchar", nullable: false })
  lastName: string;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "varchar", nullable: true })
  phoneNumber: string;

  @Column({ type: "varchar", nullable: false })
  password: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 10000.0 })
  balance: number;

  @Column({ type: "varchar", default: "user" })
  role: string;

  @Column({ type: "boolean", default: false })
  isVerified: boolean;

  @Column({ type: "varchar", nullable: true })
  otp: string;

  @Column({ type: "timestamp", nullable: true })
  otpExpiresAt: Date;
}
