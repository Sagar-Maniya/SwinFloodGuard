import { Request, RequestHandler, Response } from "express";
import * as bcrypt from "bcrypt";
import User from "../models/user.model";
import { validationResult } from "express-validator";
import { generateAccessToken, RolesEnum } from "../middleware/jwt";
import OTP from "../models/otp.model";
import { Op } from "sequelize";
import { transporter } from "../services/email";

const saltRounds = 10;

export const registerUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json(result.mapped());
  }

  const { first_name, last_name, email, password } = req.body;

  let salt = await bcrypt.genSalt(saltRounds);
  let password_hash = await bcrypt.hash(password, salt);

  try {
    await User.create({
      first_name,
      last_name,
      email,
      password_hash,
    });
  } catch (err: any) {
    if (err.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ message: "This email is already being used." });
    } else {
      return res.status(500).json({ message: "Internal server error." });
    }
  }

  return res.status(200).json({ message: "Register successfully." });
};

export const loginUser: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(401).json({
      message: "Invalid username/password.",
    });
  }

  const { email, password } = req.body;

  const user: User | null = await User.findOne({ where: { email } });
  if (user == null) {
    return res.status(401).json({
      message: "Invalid username/password.",
    });
  }

  let matched = await bcrypt.compare(password, user.password_hash);

  if (!matched) {
    return res.status(401).json({
      message: "Invalid username/password.",
    });
  }

  let token = generateAccessToken(user.id, RolesEnum.User);

  return res.status(200).json({
    message: "Login successfully.",
    data: { token: token, id: user.id },
  });
};

export const getUserById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  if (id !== res.locals.userId && res.locals.role !== RolesEnum.Admin) {
    return res.sendStatus(403);
  }

  const user = await User.findByPk(id);

  if (user === null) {
    return res.sendStatus(404);
  }

  const {
    first_name,
    last_name,
    email,
    phone,
    address,
    date_of_birth,
    gender,
    is_verified,
  } = user;

  return res.status(200).json({
    message: "Ok",
    data: {
      first_name,
      last_name,
      email,
      phone,
      address,
      date_of_birth: date_of_birth?.toISOString().substring(0, 10),
      gender,
      is_verified,
    },
  });
};

export const updateUserById: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  if (id !== res.locals.userId) {
    return res.sendStatus(403);
  }

  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json(result.mapped());
  }

  const user = await User.findByPk(id);

  if (user === null) {
    return res.sendStatus(404);
  }

  if (!user.is_verified) {
    return res.sendStatus(403);
  }

  const {
    first_name,
    last_name,
    phone,
    address,
    date_of_birth,
    gender,
  } = req.body;

  user.first_name = first_name;
  user.last_name = last_name;
  user.phone = phone;
  user.address = address;
  user.date_of_birth = date_of_birth;
  user.gender = gender;

  user.save();

  return res.status(200).json({
    message: "Updated the profile successfully.",
  });
};

export const sendOtp: RequestHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (id !== res.locals.userId) {
    return res.sendStatus(403);
  }

  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json(result.mapped());
  }

  let oneMinuteBeforeNow = new Date(new Date().getTime() - 60000);

  let otp = await OTP.findOne({
    where: { createdAt: { [Op.gt]: oneMinuteBeforeNow } },
  });

  if (otp !== null) {
    return res
      .status(400)
      .json({ message: "Wait for at least one before requesting new OTP." });
  }

  let newOtp = generateOTP();

  await OTP.create({ otp: newOtp, userId: id });
  try {
    const user = await User.findByPk(id);

    if (user === null) {
      return res.sendStatus(404);
    }

    await transporter.sendMail({
      from: "no-reply@swinburne.com",
      to: user.email,
      subject: "OTP for app",
      html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Swinburne University</a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>Thank you for choosing Swinburne University. Use the following OTP to complete your Sign Up procedures. OTP is valid for 15 minutes</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${newOtp}</h2>
          <p style="font-size:0.9em;">Regards,<br />Swinburne University</p>
          <hr style="border:none;border-top:1px solid #eee" />
          <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
            <p>Swinburne University</p>
            <p>Australia</p>
          </div>
        </div>
      </div>`,
    });
  } catch (err: any) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error." });
  }

  return res.status(200).json({ message: "OTP sent successfully." });
};

export const validateOtp: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;
  if (id !== res.locals.userId) {
    return res.sendStatus(403);
  }

  const { otp } = req.body;

  let fiveMinuteBeforeNow = new Date(new Date().getTime() - 300000);

  let otpInDb = await OTP.findOne({
    where: { createdAt: { [Op.gt]: fiveMinuteBeforeNow }, userId: id },
    order: [["createdAt", "DESC"]],
  });

  if (!(otpInDb !== null && otpInDb.otp === otp)) {
    return res.status(400).json({ message: "Invalid OTP." });
  }

  await User.update({ is_verified: true }, { where: { id } });

  return res.status(200).json({ message: "OTP verified successfully." });
};

const generateOTP = () => {
  var digits = "0123456789";

  var otpLength = 6;

  var otp = "";

  for (let i = 1; i <= otpLength; i++) {
    var index = Math.floor(Math.random() * digits.length);

    otp = otp + digits[index];
  }

  return otp;
};
