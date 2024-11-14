import { Request, Response, NextFunction } from 'express';
import pool from '../config/pool';

declare global {
  namespace Express {
    interface Request {
      db: typeof pool;
    }
  }
}

const dbMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req.db = pool; // Attach the pool to the request object
  next();
};

export default dbMiddleware;
