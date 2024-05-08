import { Request, RequestHandler, Response } from "express";
import { validationResult } from "express-validator";
import axios from 'axios';
import { getDistance } from "geolib";

export const DEFAULT_LATITUDE = 13.067439
export const DEFAULT_LONGITUDE = 80.237617
export const MAX_DISTANCE = 25000 // 25 km

export const getFloodData: RequestHandler = async (
    req: Request,
    res: Response
) => {
    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(400).json(result.mapped());
    }

    const { latitude, longitude } = parseLatLon(req)

    const distance = getDistance(
        { latitude: latitude, longitude: longitude },
        { latitude: DEFAULT_LATITUDE, longitude: DEFAULT_LONGITUDE }
    )

    if (distance > MAX_DISTANCE) {
        return res.status(400).json({ message: 'User is too far from chennai' })
    }


    try {
        // Make a call to another web API using axios
        const response = await axios.get('https://flood-api.open-meteo.com/v1/flood',
            {
                params: {
                    "latitude": latitude,
                    "longitude": longitude,
                    "daily": "river_discharge",
                    "past_days": 31,
                    "forecast_days": 31,
                },
            }
        );

        const river_discharge: Array<number | null> = response?.data?.daily?.river_discharge

        let sum = river_discharge.reduce((accumulator, currentValue) => {
            if (accumulator === null) {
                accumulator = 0
            }
            if (currentValue === null) {
                return accumulator
            }

            return accumulator + currentValue
        })

        if (sum === null) {
            sum = 0
        }

        let flood_probability = getFloodProbability(sum)

        // Send the response from the other API back to the client
        return res.json({
            "river_discharge": sum,
            "flood_probability": flood_probability,
        });
    } catch (error) {
        // Handle errors
        console.error('Error while calling flood api:', error);

        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getFloodProbability = (discharge: number): number => {
    if (discharge < 800) {
        return 0
    }

    if (discharge < 1200) {
        return (discharge - 800) * 99 / 400
    }

    return 100
}

const parseLatLon = (req: Request): { latitude: number, longitude: number } => {
    let latitude: number

    if (!req.query.latitude) {
        latitude = DEFAULT_LATITUDE
    } else {
        latitude = parseFloat(req.query.latitude as string)
    }

    let longitude: number

    if (!req.query.longitude) {
        longitude = DEFAULT_LONGITUDE
    } else {
        longitude = parseFloat(req.query.longitude as string)
    }

    return {
        latitude,
        longitude
    }
}

