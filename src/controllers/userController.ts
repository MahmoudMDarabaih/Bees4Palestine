import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import pool from '../config/database';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { name, email, password } = req.body;
        const userId = uuidv4();  // Generate UUID

        const [result] = await pool.query(
            'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)',
            [userId, name, email, password]
        );

        res.status(201).json({ id: userId, name, email });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user.' });
    }
};
