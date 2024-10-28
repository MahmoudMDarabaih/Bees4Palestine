import { JwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;  // This adds the 'user' property to Request
    }
  }
}
