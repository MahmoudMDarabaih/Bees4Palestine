import { NextFunction, Request, Response } from 'express';
import { UserDto } from '../dtos/UserDTO';
import { createNewUserService, checkIfEmailExists, checkIfInvitationCodeValid } from '../services/userServices';
import errorHandler from '../utils/errorHandler'
import APIError from '../utils/APIError';
import bcrypt from 'bcryptjs';


export const registerUser = errorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { firstName, lastName, email, password, invitationCode } = req.body;
        const newUser = new UserDto(firstName, lastName, email, password, invitationCode)
        if (!await checkIfInvitationCodeValid(newUser.invitationCode)) {
            return next(new APIError('Code is either invalid or already used!!', 400));
        }
        if (await checkIfEmailExists(newUser.email)) {
            return next(new APIError('Email already in use', 400));
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        newUser.password = hashedPassword;
        // check if user created successful -- to do
        createNewUserService(newUser);
        res.status(201).json({
            message: 'User registered successfully',
        });
    });
