import { Router } from "express";
import { loginAdmin } from "../controller/admin.controller";
import { checkExact, checkSchema } from "express-validator";
import {
  DefaultSchemaKeys,
  Schema,
} from "express-validator/src/middlewares/schema";

const loginAdminSchema: Schema<DefaultSchemaKeys> = {
  email: {
    trim: true,
    notEmpty: true,
    isEmail: true,
    isLength: {
      options: {
        max: 128,
      },
    },
  },
  password: {
    trim: true,
    notEmpty: true,
    isLength: {
      options: {
        min: 8,
        max: 50,
      },
    },
  },
};

const router = Router();

router.post("/login", checkExact(checkSchema(loginAdminSchema)), loginAdmin);

export default router;
