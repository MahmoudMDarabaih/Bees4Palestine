import { NextFunction, Response, Request } from "express-serve-static-core";
import errorHandler from "../utils/functions/errorHandler";
import { CreateMissionDto } from "../dtos/MissionDTO";
import { 
    createNewMissionService, 
    getAllMissionsBy_Service, 
    getAllMissionsService, 
    getMissionService, 
    deleteMissionService, 
    updateMission } from "../services/missionServices"
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
        const mission = await getMissionService(missionID);
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
export const deleteMissions = errorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const result = await deleteMissionService(id);
        if (result) {
            res.status(200).json(
                {
                    statues: "The mission was deleted successfully!",
                }
            );
        }
        else {
            next(new APIError("an error happened while deleting the mission or mission doesn't exist!!", 401))
        }
    }


)
export const updateMissionByID = errorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const { ...fieldsToUpdate } = req.body;

        const result = await updateMission(id, fieldsToUpdate);
        if (result) {
            res.status(200).json(
                {
                    updatedMission: result,
                    statues: "The mission was deleted successfully!",
                }
            );
        }
        else {
            next(new APIError("Mission not found or no changes were made.", 404))
        }
    }
)