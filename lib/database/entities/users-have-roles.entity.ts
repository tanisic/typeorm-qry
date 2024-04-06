import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from "typeorm";

@Entity("users_have_roles")
class UsersHaveRoles {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({
    name: "user_id",
    type: "int",
    nullable: false,
    unique: false,
  })
  public userId!: number;

  @Column({
    name: "role_id",
    type: "int",
    nullable: false,
    unique: false,
  })
  public roleId!: number;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
  })
  public createdAt!: Date;

  @UpdateDateColumn({
    name: "updated_at",
    type: "timestamp",
    nullable: true,
  })
  public updatedAt!: Date;
}
export default UsersHaveRoles;
