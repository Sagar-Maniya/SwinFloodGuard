import { Router } from "express";
import {
    getFloodData
} from "../controller/flood.controller";
import { checkExact, checkSchema } from "express-validator";
import {
    DefaultSchemaKeys,
    Schema,
} from "express-validator/src/middlewares/schema";

const floodQuerySchema: Schema<DefaultSchemaKeys> = {
    latitude: {
        isLatLong: true,
        in: ["params"],
        optional: true,
    },
    longitude: {
        isLatLong: true,
        in: ["params"],
        optional: true,
    },
};

const router = Router();

router.get("/", checkExact(checkSchema(floodQuerySchema)), getFloodData);

export default router;
