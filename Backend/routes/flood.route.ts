import { Router } from "express";
import {
    DEFAULT_LATITUDE,
    DEFAULT_LONGITUDE,
    getFloodData
} from "../controller/flood.controller";
import { checkExact, checkSchema } from "express-validator";
import {
    DefaultSchemaKeys,
    Schema,
} from "express-validator/src/middlewares/schema";

const floodQuerySchema: Schema<DefaultSchemaKeys> = {
    latitude: {
        isFloat: {
            options: {
                min: -90,
                max: 90,
            },
        },
        in: ["query"],
        optional: true,
        default: {
            options: {
                default_value: DEFAULT_LATITUDE,
            }
        },
    },
    longitude: {
        isFloat: {
            options: {
                min: -180,
                max: 180,
            },
        },
        in: ["query"],
        optional: true,
        default: {
            options: {
                default_value: DEFAULT_LONGITUDE,
            }
        },
    },
};

const router = Router();

router.get("/", checkExact(checkSchema(floodQuerySchema)), getFloodData);

export default router;
