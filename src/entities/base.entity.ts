import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export interface BaseInterface {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export class BaseEntity implements BaseInterface {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "timestamp with time zone" })
  @CreateDateColumn()
  createdAt: string;

  @Column({ type: "timestamp with time zone" })
  @UpdateDateColumn()
  updatedAt: string;
}
