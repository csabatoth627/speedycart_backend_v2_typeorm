import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne
} from "typeorm";
import { User } from "./User";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  _id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false })
  image: string;

  @Column({ nullable: false })
  brand: string;

  @Column({ nullable: false })
  category: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false, default: 0 })
  numReviews: number;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0,
  })
  price: number;

  @Column({ nullable: false, default: 0 })
  countInStock: number;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.photos)
  user: User
}
