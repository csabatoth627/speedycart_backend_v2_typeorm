import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { OrderItem } from "./OrderItems";

@Entity()
export class Order {
  @PrimaryGeneratedColumn("uuid")
  _id: number;

  @Column({ nullable: false })
  paymentMethod: string;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0.0,
  })
  itemsPrice: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0.0,
  })
  taxPrice: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0.0,
  })
  shippingPrice: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0.0,
  })
  totalPrice: number;

  @Column({ nullable: false, default: false })
  isPaid: boolean;

  @Column()
  paidAt: Date;

  @Column({ nullable: false, default: false })
  isDelivered: boolean;

  @Column()
  deliveredAt: Date;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @OneToOne(() => User, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];
}
