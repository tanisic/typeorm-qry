import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user";

export enum CommentKind {
  Comment = "COMMENT",
  Message = "MESSAGE",
  Note = "NOTE",
}

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({
    type: "text",
    nullable: false,
  })
  public text!: string;

  @Column({
    type: "enum",
    enum: CommentKind,
    nullable: false,
  })
  public kind!: CommentKind;

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

  @ManyToOne(() => User, (item) => item.id)
  @JoinColumn({
    name: "created_by",
  })
  public createdBy!: User;
}
