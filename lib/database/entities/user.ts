import {
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinColumn,
  JoinTable,
  OneToOne,
  OneToMany,
  Entity,
  Column,
  UpdateDateColumn,
} from "typeorm";
import { Address, Role, Comment, BookList } from ".";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({
    type: "varchar",
    length: 100,
    nullable: false,
    unique: true,
  })
  public login!: string;

  @Column({
    name: "first_name",
    type: "varchar",
    length: 100,
    nullable: true,
    default: "NULL",
  })
  public firstName!: string;

  @Column({
    name: "last_name",
    type: "varchar",
    length: 100,
    nullable: true,
    default: "NULL",
  })
  public lastName!: string;

  @Column({
    name: "is_active",
    type: "boolean",
    width: 1,
    nullable: true,
    default: false,
  })
  public isActive!: boolean;

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

  @OneToOne(() => Address, (item) => item.id)
  @JoinColumn({
    name: "addresses_id",
  })
  public addresses!: Address;

  @OneToOne(() => User, (item) => item.id)
  @JoinColumn({
    name: "manager_id",
  })
  public manager!: User;

  @ManyToMany(() => Role, (item) => item.users)
  @JoinTable({
    inverseJoinColumn: {
      referencedColumnName: "id",
      name: "role_id",
    },
    joinColumn: {
      referencedColumnName: "id",
      name: "user_id",
    },
  })
  public roles!: Role[];

  @OneToMany(() => Comment, (item) => item.createdBy)
  public comments!: Comment[];

  @ManyToMany(() => BookList, (item) => item.users)
  @JoinTable({
    name: "users_have_book",
    inverseJoinColumn: {
      referencedColumnName: "id",
      name: "book_id",
    },
    joinColumn: {
      referencedColumnName: "id",
      name: "user_id",
    },
  })
  public books!: BookList[];
}
