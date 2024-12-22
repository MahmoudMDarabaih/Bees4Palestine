import { decodeToken } from '../services/JWT_Services';
import { GetUserDto } from '../dtos/UserDTO';
import APIError from '../utils/APIError';
import errorHandler from '../utils/errorHandler';
import { Identifier } from 'sequelize';
import { checkUserExistence } from '../services/userServices';
import { NextFunction, Request, Response } from 'express';


const authMiddleware = errorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers.authorization;
        let token;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            [, token] = authHeader.split(' ');
        }

        // If not found in the header, try to get it from cookies
        if (!token) {
            token = req.cookies.jwt;
        }

        // If token is still not found
        if (!token) {
            return next(new APIError('Unauthorized: No token provided', 401));
        }

        const decoded: any = decodeToken(token);
        const userId = decoded.userId;
        const user = await checkUserExistence({ id: userId })

        if (!user) {
            return next(new APIError('Unauthorized: User not found', 401));
        }

        (req as any).user = user;
        next();
    },
);

export default authMiddleware;
