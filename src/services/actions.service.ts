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
export const getActionService = async (id: string) => {
    const [result]: any = await db.query(
        `SELECT *
         FROM actions 
         WHERE id = ?
         LIMIT 1`,
        [id]
    );
    return result;
}
export const getAllActionsService = async () => {
    const [result]: any = await db.query(
        `SELECT *
         FROM actions 
        `
    );
    return result;
}
export const deleteActionService = async (id: string) => {
    const [result]: any = await db.query(
        `Delete FROM actions 
         WHERE id = ?`,
        [id]
    );
    if (result?.affectedRows === 1) {
        return true;
    }
    return null;
}
