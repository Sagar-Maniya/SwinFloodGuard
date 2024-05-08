import {
  Table,
  Column,
  Model,
  DataType,
  Unique,
  AllowNull,
  Default,
} from "sequelize-typescript";

@Table
class User extends Model {
  @Column(DataType.STRING(64))
  first_name!: string;

  @Column(DataType.STRING(64))
  last_name!: string;

  @Unique
  @Column(DataType.STRING(64))
  email!: string;

  @Column(DataType.STRING(60))
  password_hash!: string;

  @Default(false)
  @Column
  is_verified: boolean;

  @AllowNull
  @Column(DataType.STRING(10))
  phone?: string;

  @AllowNull
  @Column(DataType.STRING(128))
  address?: string;

  @AllowNull
  @Column
  date_of_birth?: Date;

  @AllowNull
  @Column(DataType.ENUM("Male", "Female", "Other"))
  gender?: string;
}

export default User;
