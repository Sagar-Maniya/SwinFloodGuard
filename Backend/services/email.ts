import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "booksharing09@gmail.com",
    pass: "xgmntfeiumkghpnj",
  },
});
