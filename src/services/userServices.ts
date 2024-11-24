import { QueryResult } from 'mysql2';
import db from '../config/pool';
import { UserDto } from '../dtos/UserDTO';


const createNewUserService = async (userDto: UserDto): Promise<QueryResult> => {
    let result: QueryResult;
    [result] = await db.query(
        `INSERT INTO users 
        (full_name, email, password, invitation_code) 
        VALUES (?, ?, ?, ?)`,
        [userDto.fullName, userDto.email, userDto.password, userDto.invitationCode]);
    return result;
}
const checkIfEmailExists = async (email: string): Promise<boolean> => {
    const [rows]: any = await db.query(`
        SELECT 1 FROM users 
        WHERE email = ?`, [email]);
    return rows.length > 0 ? true : false;
}
export { createNewUserService, checkIfEmailExists };