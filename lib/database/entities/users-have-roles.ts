import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class UsersHaveRoles {
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
}
