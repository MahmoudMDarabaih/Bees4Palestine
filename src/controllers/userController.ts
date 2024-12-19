import { NextFunction, Request, Response } from 'express';
import { CreateUserDto, GetUserDto } from '../dtos/UserDTO';
import { createNewUserService, checkUserExistence, checkIfInvitationCodeValid } from '../services/userServices';
import errorHandler from '../utils/errorHandler'
import APIError from '../utils/APIError';
import bcrypt from 'bcryptjs';


export const registerUser = errorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { firstName, lastName, email, password, invitationCode } = req.body;
        const newUser = new CreateUserDto(firstName, lastName, email, password, invitationCode)
        if (!await checkIfInvitationCodeValid(newUser.invitationCode)) {
            return next(new APIError('Code is either invalid or already used!!', 400));
        }
        if (await checkUserExistence({ email: newUser.email })) {
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

export const userLogin = errorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        const user: GetUserDto | null = await checkUserExistence({ email: email })
        if (user) {
            if (!await bcrypt.compare(password, user.password)) {
                res.status(400).json({
                    message: 'the provided password is not correct',
                });
            }
            res.status(200).json({
                message: 'User logged in successfully',
                user: user
            });
        }
        else {
            res.status(400).json({
                message: 'the provided email is not registered for a user',
            });
        }
    });
