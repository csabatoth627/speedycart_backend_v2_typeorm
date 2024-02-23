import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { Order } from "./Order";

@Entity()
export class ShippingAddress {
  @PrimaryGeneratedColumn("uuid")
  _id: number;

  @Column({ nullable: false })
  address: string;

  @Column({ nullable: false })
  city: string;

  @Column({ nullable: false })
  postalCode: string;

  @Column({ nullable: false })
  country: string;

  @OneToOne(() => Order)
  @JoinColumn()
  order: Order
}
