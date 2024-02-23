import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Order {
  @PrimaryGeneratedColumn("uuid")
  _id: number;

  @Column({nullable: false})
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
  deliveredAt: Date

  
  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.orders)
  user: User
}
