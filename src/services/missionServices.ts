import { CreateMissionDto } from "../dtos/MissionDTO";
import db from '../config/pool';
import { QueryResult } from "mysql2";

const createNewMissionService = async (mission: CreateMissionDto): Promise<QueryResult> => {
    const title = JSON.stringify(mission.title);
    const description = JSON.stringify(mission.description);
    const actions = JSON.stringify(mission.actions);

    const [result]: any = await db.query(
        `INSERT INTO missions 
                (title, description, platform_id, stars, expires_at, status, type, actions,mission_Link) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [title, description, mission.platformID, mission.stars, mission.expirationDate, mission.status, mission.type, actions, mission.mission_Link]
    );
    return result.insertId;
}


const getMissionService = async (missionID: string) => {
    const [rows]: any = await db.query(
        `SELECT *
         FROM missions 
         WHERE id = ?
         LIMIT 1`,
        [missionID]
    );

    if (rows.length === 0 || !rows) {
        return null;
    }
    return rows[0];
}

const deleteMissionService = async (missionID: string) => {
    const [result]: any = await db.query(
        `Delete FROM missions 
         WHERE id = ?`,
        [missionID]
    );
    if (result?.affectedRows === 1) {
        return true;
    }

    return null;
}

const getAllMissionsService = async () => {
    const [rows]: any = await db.query(
        `SELECT *
         FROM missions 
         `
    );

    if (rows.length === 0 || !rows) {
        return null;
    }
    return rows;
}

const getAllMissionsBy_Service = async (options: { platformID?: string, type?: string }) => {
    const { platformID, type } = options;

    // Build dynamic SQL query and parameters
    let query = `SELECT * FROM missions`;
    const queryParams: any[] = [];

    if (platformID) {
        query += `WHERE platform_id = ? `;
        queryParams.push(platformID);
    }

    if (type) {
        query += `WHERE type = ? `;
        queryParams.push(type);
    }

    const [rows]: any = await db.query(query.trim(), queryParams);

    if (!rows || rows.length === 0) {
        return null;
    }

    return rows;
};

export { createNewMissionService, getMissionService, getAllMissionsService, getAllMissionsBy_Service, deleteMissionService };