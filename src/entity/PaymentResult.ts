import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Order } from "./Order";

@Entity()
export class PaymentResult {
  @PrimaryGeneratedColumn("uuid")
  _id: number;

  @Column()
  id: string;

  @Column()
  status: string;

  @Column()
  update_time: string;

  @Column()
  email_address: string;

  @OneToOne(() => Order, {onDelete: "CASCADE"})
  @JoinColumn()
  order: Order
}
