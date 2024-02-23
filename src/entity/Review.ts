import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Product } from "./Product";
import { User } from "./User";

@Entity()
export class Review {

    @PrimaryGeneratedColumn("uuid")
    _id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    rating: number;

    @Column({ nullable: false })
    comment: string;

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
  
    @UpdateDateColumn({
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
      onUpdate: "CURRENT_TIMESTAMP",
    })
    updatedAt: Date;

    @ManyToOne(() => Product, (product) => product.reviews)
    product: Product

    @ManyToOne(() => User, (user) => user.reviews)
    user: User
}
