import { CreateMissionDto } from "../dtos/MissionDTO";
import db from '../config/pool';
import { QueryResult } from "mysql2";

const createNewMissionService = async (mission: CreateMissionDto): Promise<QueryResult> => {
    const title = JSON.stringify(mission.title);
    const description = JSON.stringify(mission.description);
    const actions = JSON.stringify(mission.actions);

    const [result]: any = await db.query(
        `INSERT INTO missions 
                (title, description, platform_id, stars, expires_at, status, type, actions) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [title, description, mission.platformID, mission.stars, mission.expirationDate, mission.status, mission.type, actions]
    );
    return result.insertId;
}


const getMissionService = async (missionID: number) => {
    const [rows]: any = await db.query(
        `SELECT *
         FROM missions 
         WHERE id = ?`,
        [missionID]
    );

    if (rows.length === 0 || !rows) {
        return null;
    }
    return rows[0];
    // Parse JSON fields back into objects if necessary
    // const mission = {
    //     ...missionDetails[0],
    //     title: JSON.parse(missionDetails[0].title),
    //     description: JSON.parse(missionDetails[0].description),
    //     actions: JSON.parse(missionDetails[0].actions),
    // };


}
export { createNewMissionService, getMissionService };