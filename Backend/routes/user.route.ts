import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserById,
  updateUserById,
  sendOtp,
  validateOtp,
} from "../controller/user.controller";
import { checkExact, checkSchema } from "express-validator";
import {
  DefaultSchemaKeys,
  Schema,
} from "express-validator/src/middlewares/schema";
import { RolesEnum, authorize } from "../middleware/jwt";

const registerUserSchema: Schema<DefaultSchemaKeys> = {
  first_name: {
    trim: true,
    notEmpty: true,
    isLength: {
      options: {
        max: 64,
      },
    },
  },
  last_name: {
    trim: true,
    notEmpty: true,
    isLength: {
      options: {
        max: 64,
      },
    },
  },
  email: {
    trim: true,
    notEmpty: true,
    isEmail: true,
    isLength: {
      options: {
        max: 64,
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

const loginUserSchema: Schema<DefaultSchemaKeys> = {
  email: {
    trim: true,
    notEmpty: true,
    isEmail: true,
    isLength: {
      options: {
        max: 64,
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

const updateUserSchema: Schema<DefaultSchemaKeys> = {
  id: {
    trim: true,
    notEmpty: true,
    in: ["params"],
  },
  first_name: {
    trim: true,
    notEmpty: true,
    isLength: {
      options: {
        max: 64,
      },
    },
  },
  last_name: {
    trim: true,
    notEmpty: true,
    isLength: {
      options: {
        max: 64,
      },
    },
  },
  phone: {
    trim: true,
    notEmpty: true,
    isMobilePhone: true,
  },
  address: {
    trim: true,
    notEmpty: true,
    isLength: {
      options: {
        max: 128,
      },
    },
  },
  date_of_birth: {
    trim: true,
    notEmpty: true,
    isDate: true,
  },
  gender: {
    trim: true,
    notEmpty: true,
    isIn: {
      options: [["Male", "Female", "Other"]],
    },
  },
};

const otpSchema: Schema<DefaultSchemaKeys> = {
  otp: {
    trim: true,
    notEmpty: true,
    isLength: {
      options: {
        max: 6,
        min: 6,
      },
    },
  },
};

const router = Router();

router.post(
  "/register",
  checkExact(checkSchema(registerUserSchema)),
  registerUser
);

router.post("/login", checkExact(checkSchema(loginUserSchema)), loginUser);

router.post("/:id/otp", authorize([RolesEnum.User]), sendOtp);

router.post(
  "/:id/validate-otp",
  checkExact(checkSchema(otpSchema)),
  validateOtp
);

router.get("/:id", authorize([RolesEnum.User, RolesEnum.Admin]), getUserById);

router.put(
  "/:id",
  authorize([RolesEnum.User]),
  checkExact(checkSchema(updateUserSchema)),
  updateUserById
);

export default router;
