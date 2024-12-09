import { QueryResult } from 'mysql2/promise';
import db from '../config/pool';
import { UserDto } from '../dtos/UserDTO';
import { v4 as uuidv4 } from 'uuid';
import { promises } from 'dns';
import APIError from '../utils/APIError';
import { console } from 'inspector';



const createNewUserService = async (userDto: UserDto): Promise<QueryResult> => {
    // Insert the user into the database and retrieve the result
    const [result]: any = await db.query(
        `INSERT INTO users 
        (first_name, last_name, email, password, invitation_code) 
        VALUES (?, ?, ?, ?, ?)`,
        [userDto.firstName, userDto.lastName, userDto.email, userDto.password, userDto.invitationCode]
    );

    // Access the newly inserted ID from the insertId property
    const userId = result.insertId;

    // Update the invitation code as used
    const [codeResult]: any = await db.execute(
        `UPDATE InvitationCodes
         SET 
            is_used = true,
            used_at = NOW(),
            used_by = ?
         WHERE code = ?`,
        [userId, userDto.invitationCode]
    );

    // Return the result of the user creation
    return result;
};

const checkIfEmailExists = async (email: string): Promise<boolean> => {
    const [rows]: any = await db.query(
        `SELECT 1 FROM users 
        WHERE email = ?`, [email]);
    return rows.length > 0 ? true : false;
}
/**
 * Generates an invitation code using UUID.
 * @returns A unique invitation code, or API Error if the user have already generated 4 codes within 24 hours .
 */
const generateInvitationCode = async (userId: String): Promise<string | APIError> => {
    const canGenerate: boolean = await canGenerateCodes(userId);
    if (canGenerate) {
        const code = uuidv4();
        await db.query(
            `INSERT INTO InvitationCodes (created_by, code) VALUES (?, ?)`,
            [userId, code]
        );
        return code;
    }
    return new APIError("You already generated 4 invitation codes!!\nTry after 24 hours.", 403);
};
/**
 * check if the user with the ID of userId can generate a new code or not,
 * the user can generate 4 codes a day
 * @returns a boolean value as an indicator of the user ability to generate new invitation code
 * @requires the user ID (userId : String)
 */
const canGenerateCodes = async (userId: String): Promise<boolean> => {
    const [rows]: any[] = await db.query(
        `SELECT COUNT(*) AS generated_count 
         FROM InvitationCodes 
         WHERE created_by = ? 
           AND created_at >= NOW() - INTERVAL 1 DAY`,
        [userId]
    );
    return rows[0].generated_count < 4;
}


const checkIfInvitationCodeValid = async (code: string): Promise<boolean> => {
    const [result]: any = await db.query(
        `select * from InvitationCodes
        WHERE code = ? AND is_used = false
        `, [code]
    );
    return result[0] ? true : false;
}

export { createNewUserService, checkIfEmailExists, generateInvitationCode, checkIfInvitationCodeValid };