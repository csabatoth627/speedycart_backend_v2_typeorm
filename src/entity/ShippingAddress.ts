import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}
