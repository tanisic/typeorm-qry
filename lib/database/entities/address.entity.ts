import {
  PrimaryGeneratedColumn,
  OneToOne,
  Column,
  Entity,
  UpdateDateColumn,
  type Relation,
  CreateDateColumn,
} from "typeorm";
import "reflect-metadata";
import User from "./user.entity";

@Entity("addresses")
export default class Address {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({
    type: "varchar",
    length: 70,
    nullable: true,
    default: "NULL",
  })
  public city!: string;

  @Column({
    type: "varchar",
    length: 70,
    nullable: true,
    default: "NULL",
  })
  public state!: string;

  @Column({
    type: "varchar",
    length: 68,
    nullable: true,
    default: "NULL",
  })
  public country!: string;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    nullable: true,
  })
  public createdAt!: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
    nullable: true,
  })
  public updatedAt!: Date;

  @OneToOne(() => User, (item) => item.address)
  public user!: Relation<User>;
}
