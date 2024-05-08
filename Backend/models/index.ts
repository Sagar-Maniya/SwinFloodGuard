import { Sequelize } from "sequelize-typescript";
import User from "./user.model";
import OTP from "./otp.model";
import Evacuation from "./evacuation.model";

const db = new Sequelize({
  dialect: "sqlite",
  storage: "./floodDB.sqlite",
  logging: false,
  models: [User, OTP, Evacuation],
});

export default db;
