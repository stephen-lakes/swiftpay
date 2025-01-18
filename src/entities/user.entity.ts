import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  MinLength,
} from "class-validator";

import { BaseEntity } from "./base.entity";

export interface User {
  id: number;
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
}

@Entity({ name: "user" })
export class User extends BaseEntity implements User {
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

  @Column({ type: "decimal", precision: 10, scale: 2, default: 10000.0 })
  balance: number;

  @Column({ default: "user" })
  role: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({ nullable: true })
  otp?: string;

  @Column({ type: "timestamp", nullable: true })
  otpExpiresAt?: Date;
}
