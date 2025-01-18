import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

export interface BaseInterface {
  id: number;
  uuid: string;
  createdAt?: string;
  updatedAt?: string;
}

export class BaseEntity implements BaseInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "uuid", default: uuidv4 })
  uuid: string;

  @Column({ type: "timestamp with time zone" })
  @CreateDateColumn()
  createdAt: string;

  @Column({ type: "timestamp with time zone" })
  @UpdateDateColumn()
  updatedAt: string;
}
