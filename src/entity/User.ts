import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
import { Product } from "./Product";
import { Review } from "./Review";
import { Order } from "./Order";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  _id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ default: false, nullable: false })
  isAdmin: boolean;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @OneToMany(() => Product, (product) => product.user)
    products: Product[]

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[]

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[]




}
