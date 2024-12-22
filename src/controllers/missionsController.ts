import { NextFunction, Response, Request } from "express-serve-static-core";
import errorHandler from "../utils/functions/errorHandler";
import { CreateMissionDto } from "../dtos/MissionDTO";
import { createNewMissionService, getMissionService } from "../services/missionServices"
import APIError from "../utils/types/APIError";



export const createMission = errorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { title, description, platformID, stars, expirationDate, status, type, actions } = req.body;
        let mission = new CreateMissionDto(title, description, platformID, stars, expirationDate, status, type, actions);
        const missionID = await createNewMissionService(mission);
        if (Number.isInteger(missionID)) {
            const mission = await getMissionService(missionID as any);
            res.status(201).json(
                {
                    message: "created new mission successfully",
                    mission: mission
                }
            );
        }
        else {
            next(new APIError("ann error creating the mission", 401))
        }
    }
)