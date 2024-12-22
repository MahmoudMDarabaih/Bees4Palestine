import { GetUserDto } from '../dtos/UserDTO';
import APIError from '../utils/APIError';
import errorHandler from '../utils/errorHandler';
import { NextFunction, Request, Response } from 'express';

const adminMiddleware = errorHandler(
    async(req: Request, res: Response, next: NextFunction) => {
      const user = (req as any).user as GetUserDto;
  
      if (!user) {
        return next(new APIError('Unauthorized: User not found', 401));
      }
  
      if (user.role !== 'admin') {
        return next(new APIError('Forbidden: Access Denied ', 403));
      }
  
      next();
    },
  );
  
  export default adminMiddleware;