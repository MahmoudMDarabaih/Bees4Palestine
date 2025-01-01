import { Request, Response, NextFunction } from 'express';
import { uploadMiddleware } from '../services/storage.service';
import APIError from '../utils/types/APIError';

export const handleMissionImageUpload = (req: Request, res: Response, next: NextFunction) => {
    uploadMiddleware.single('image')(req, res, (err) => {
        if (err) {
            return new APIError(err.message, 400);
        }
        next();
    });
};