import db from '../config/pool';


export const addAction = async (name: JSON, platformID: number) => {
    const newName: string = JSON.stringify(name);
    const [result]: any = await db.query(`INSERT INTO actions
        (name, platform_id)
        VALUES (?, ?)`,
        [newName, platformID]
    )
    return result;
}
export const getActionService = async (id: number) => {
    const [result]: any = await db.query(
        `SELECT *
         FROM actions 
         WHERE id = ?
         LIMIT 1`,
        [id]
    );
    return result;
}