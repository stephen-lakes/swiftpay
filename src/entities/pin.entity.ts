import { Entity, Column } from "typeorm";

import { BaseEntity } from "./base.entity.ts";
import { IPIN } from "../interfaces/pin.interface.ts";

@Entity({ name: "otp" })
export class PIN extends BaseEntity implements IPIN {
  userId: string;

  @Column({ nullable: false })
  pin: string;
}
