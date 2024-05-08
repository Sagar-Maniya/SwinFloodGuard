import { Router } from "express";
import {
    getFloodData
} from "../controller/flood.controller";
import { checkExact, checkSchema } from "express-validator";
import {
    DefaultSchemaKeys,
    Schema,
} from "express-validator/src/middlewares/schema";
import { addEvacuationPoint, deleteEvacuationPoint, getEvacuationPoints } from "../controller/evacuation.controller";
import { RolesEnum, authorize } from "../middleware/jwt";

const evacuationPointSchema: Schema<DefaultSchemaKeys> = {
    latitude: {
        isFloat: {
            options: {
                min: -90,
                max: 90,
            },
        },
    },
    longitude: {
        isFloat: {
            options: {
                min: -180,
                max: 180,
            },
        },
    },
    name: {
        isLength: {
            options: {
                max: 128,
            },
        },
    }
};

const deleteEvacuationPointSchema: Schema<DefaultSchemaKeys> = {
    id: {
        trim: true,
        notEmpty: true,
        in: ["params"],
    },
}

const router = Router();

router.post(
    "/",
    authorize([RolesEnum.Admin]),
    checkExact(checkSchema(evacuationPointSchema)),
    addEvacuationPoint,
);

router.get(
    "/",
    authorize([RolesEnum.Admin, RolesEnum.User]),
    getEvacuationPoints,
)

router.delete(
    "/:id",
    authorize([RolesEnum.Admin]),
    checkExact(checkSchema(deleteEvacuationPointSchema)),
    deleteEvacuationPoint,
)


export default router;
