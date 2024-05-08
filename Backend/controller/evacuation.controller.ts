import { Request, RequestHandler, Response } from "express";
import { validationResult } from "express-validator";
import Evacuation from "../models/evacuation.model";
import { getDistance } from "geolib";
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE, MAX_DISTANCE } from "./flood.controller";


export const addEvacuationPoint: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json(result.mapped());
  }

  const { name, latitude, longitude } = req.body;

  const distance = getDistance(
    { latitude: latitude, longitude: longitude },
    { latitude: DEFAULT_LATITUDE, longitude: DEFAULT_LONGITUDE }
  )

  if (distance > MAX_DISTANCE) {
    return res.status(400).json({ message: 'Evacuation point can not be too far from chennai' })
  }

  try {
    await Evacuation.create({
      name,
      latitude,
      longitude,
    });
  } catch (err: any) {
    return res.status(500).json({ message: "Internal server error." });
  }

  return res.status(200).json({ message: "Evacuation point created." });
};

export const getEvacuationPoints: RequestHandler = async (
  _req: Request,
  res: Response
) => {
  const points = await Evacuation.findAll();

  const mappedPoints = points.map((point) => {
    const { name, latitude, longitude } = point;

    return { name, latitude, longitude, id: point.id };
  });

  return res.status(200).json({
    message: "ok",
    data: mappedPoints,
  });
};

export const deleteEvacuationPoint: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  const point = await Evacuation.findByPk(id);

  if (point === null) {
    return res.sendStatus(404);
  }

  await point.destroy()

  return res.status(200).json({
    message: "Evacuation point deleted.",
  });
};


