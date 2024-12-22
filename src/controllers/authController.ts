import { NextFunction, Request, Response } from 'express';
import { CreateUserDto, GetUserDto } from '../dtos/UserDTO';
import { createNewUserService, checkUserExistence, checkIfInvitationCodeValid } from '../services/userServices';
import errorHandler from '../utils/functions/errorHandler'
import APIError from '../utils/types/APIError';
import bcrypt from 'bcryptjs';
import { generateToken } from '../services/JWT_Services';


export const registerNewUserController = errorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { firstName, lastName, email, password, invitationCode } = req.body;
        const newUser = new CreateUserDto(firstName, lastName, email, password, invitationCode)
        if (!await checkIfInvitationCodeValid(newUser.invitationCode)) {
            return next(new APIError('Code is either invalid or already used!!', 401));
        }
        if (await checkUserExistence({ email: newUser.email })) {
            return next(new APIError('Email already in use', 401));
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        newUser.password = hashedPassword;
        // check if user created successful -- to do
        createNewUserService(newUser);
        res.status(201).json({
            message: 'User registered successfully',
        });
    });

export const LoginController = errorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { email, password } = req.body;
        const user: GetUserDto | null = await checkUserExistence({ email: email })
        if (user) {
            if (!await bcrypt.compare(password, user.password)) {
                return next(new APIError('the provided password is not correct', 401));
            }
            const token = generateToken(user);
            res.cookie('jwt', token, {
                httpOnly: true,
                expires: new Date(Date.now() + 1 * 60 * 60 * 1000), // 1 hour
            });
            res.status(200).json({
                message: 'User logged in successfully',
                token: token,
                user: user
            });
        }
        else {
            return next(new APIError('the provided email is not registered for a user', 401));
        }
    });
export const logoutController = errorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.clearCookie('jwt', { httpOnly: true });
        res.status(200).json({ message: 'Successfully logged out'/*, user: req.user */ });
    },
);
