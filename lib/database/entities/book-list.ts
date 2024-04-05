import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user";
@Entity()
export class BookList {
  @PrimaryGeneratedColumn()
  public id!: string;

  @Column({
    type: "text",
    nullable: false,
  })
  public text!: string;

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

  @ManyToMany(() => User, (item) => item.books)
  public users!: User[];
}
