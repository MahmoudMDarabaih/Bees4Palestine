import { GetUserDto } from '../../dtos/UserDTO';

declare global {
  namespace Express {
    interface Request {
      user?: GetUserDto;
    }
  }
}