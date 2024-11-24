import { NextFunction, Request, Response } from 'express';
import { UserDto } from '../dtos/UserDTO';
import { createNewUserService, checkIfEmailExists } from '../services/userServices';
import errorHandler from '../utils/errorHandler'
import APIError from '../utils/APIError';
import bcrypt from 'bcryptjs';


export const registerUser = errorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { firstName, lastName, email, password, invitationCode } = req.body;
        const newUser = new UserDto(firstName, lastName, email, password, invitationCode)
        if (await checkIfEmailExists(newUser.email)) {
            return next(new APIError('Email already in use', 400));
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        newUser.password = hashedPassword;
        createNewUserService(newUser);
        res.status(201).json({
            message: 'User registered successfully',
        });
    });
