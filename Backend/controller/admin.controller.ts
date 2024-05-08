import { Request, RequestHandler, Response } from "express";
import * as bcrypt from "bcrypt";
import User from "../models/user.model";
import { validationResult } from "express-validator";
import { RolesEnum, generateAccessToken } from "../middleware/jwt";

export const loginAdmin: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json(result.mapped());
  }

  const { email, password } = req.body;

  if (email !== "admin@swinfloodguard.com" || password !== "admin@123") {
    return res.status(401).json({
      message: "Invalid username/password.",
    });
  }

  let token = generateAccessToken(0, RolesEnum.Admin);

  return res.status(200).json({
    message: "Login successfully.",
    data: { token },
  });
};
