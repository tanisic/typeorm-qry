import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import User from "./user.entity";

@Entity("books")
class Book {
  @PrimaryGeneratedColumn()
  public id!: string;

  @Column({
    type: "text",
    nullable: false,
  })
  public text!: string;

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

  @ManyToMany(() => User, (item) => item.books)
  public users!: User[];
}

export default Book;
