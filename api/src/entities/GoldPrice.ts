import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class GoldPrice {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  date: Date;

  @Column("decimal")
  price: number;
}
