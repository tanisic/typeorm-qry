import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToMany,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";
import User from "./user.entity";

@Entity("roles")
class Role {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({
    type: "varchar",
    length: 128,
    nullable: true,
    default: "NULL",
  })
  public name!: string;

  @Column({
    type: "varchar",
    length: 128,
    nullable: false,
    unique: true,
  })
  public key!: string;

  @Column({
    name: "is_default",
    type: "boolean",
    default: "false",
  })
  public isDefault!: boolean;

  @CreateDateColumn({
    name: "created_at",
    type: "datetime",
    nullable: true,
  })
  public createdAt!: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "datetime",
    nullable: true,
  })
  public updatedAt!: Date;

  @ManyToMany(() => User, (item) => item.roles)
  public users!: User[];
}

export default Role;
