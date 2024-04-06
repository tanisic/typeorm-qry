import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import User from "./user.entity";

export enum CommentKind {
  Comment = "COMMENT",
  Message = "MESSAGE",
  Note = "NOTE",
}

@Entity("comments")
class Comment {
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

  @ManyToOne(() => User, (item) => item.id)
  @JoinColumn({
    name: "created_by",
  })
  public createdBy!: User;
}
export default Comment;
