import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { IBase } from "../interfaces/base.interface.ts";

export class BaseEntity implements IBase {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "timestamp with time zone" })
  @CreateDateColumn()
  createdAt: string;

  @Column({ type: "timestamp with time zone" })
  @UpdateDateColumn()
  updatedAt: string;
}
