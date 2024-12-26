import { NextFunction, Response, Request } from "express-serve-static-core";
import errorHandler from "../utils/functions/errorHandler";
import { CreateMissionDto } from "../dtos/MissionDTO";
import { createNewMissionService, getAllMissionsBy_Service, getAllMissionsService, getMissionService } from "../services/missionServices"
import APIError from "../utils/types/APIError";



export const createMission = errorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { title, description, platformID, stars, expirationDate, status, type, actions, mission_Link } = req.body;
        let mission = new CreateMissionDto(title, description, platformID, stars, expirationDate, status, type, actions, mission_Link);
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
export const getMission = errorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const missionID = req.params.id;
        const mission = await getMissionService(missionID as any);
        if (mission) {
            res.status(200).json(
                {
                    mission: mission
                }
            );
        }
        else {
            next(new APIError("this mission doesn't exist", 401))
        }
    }
)

export const getAllMissions = errorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const missions = await getAllMissionsService();
        if (missions) {
            res.status(200).json(
                {
                    count: missions.count,
                    missions: missions
                }
            );
        }
        else {
            next(new APIError("there is no missions to be displayed", 401))
        }
    }
)
export const getMissionsByPlatform = errorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const platformID = req.params.id;
        const missions = await getAllMissionsBy_Service({ platformID: platformID });
        if (missions) {
            res.status(200).json(
                {
                    count: missions.count,
                    missions: missions
                }
            );
        }
        else {
            next(new APIError("no results!!", 401))
        }
    }


)
export const getMissionsByType = errorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const type = req.params.id;
        const missions = await getAllMissionsBy_Service({ type: type });
        const count = missions.count;
        if (missions) {
            res.status(200).json(
                {
                    statues: "success",
                    count: count,
                    missions: missions
                }
            );
        }
        else {
            next(new APIError("no results!!", 401))
        }
    }
)