import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GoldPrice {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: Date;

  @Column("decimal")
  price: number;
}
