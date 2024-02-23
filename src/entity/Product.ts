import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  JoinColumn,
  UpdateDateColumn,
  OneToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User";
import { Review } from "./Review";

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
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP",
    onUpdate: "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => Review, (review) => review.product)
  reviews: Review[];
}
