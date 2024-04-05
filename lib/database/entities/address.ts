import {
  PrimaryGeneratedColumn,
  OneToOne,
  Column,
  Entity,
  UpdateDateColumn,
  Relation,
} from "typeorm";
import "reflect-metadata";

import { User } from ".";

@Entity()
export class Address {
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

  @Column({
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

  @OneToOne(() => User, (item) => item.addresses)
  public user!: Relation<User>;
}
