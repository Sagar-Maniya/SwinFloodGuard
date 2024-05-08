import { Sequelize } from "sequelize-typescript";
import User from "./user.model";
import OTP from "./otp.model";

const db = new Sequelize({
  dialect: "sqlite",
  storage: "./floodDB.sqlite",
  logging: false,
  models: [User, OTP,],
});

export default db;
