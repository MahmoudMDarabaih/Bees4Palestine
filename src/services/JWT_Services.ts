import jwt from 'jsonwebtoken';
import { GetUserDto } from '../dtos/UserDTO';

const generateToken = (user: GetUserDto): string => {
    const payload = {
        userId: user.id,
        email: user.email,
        role: user.role
    };

    return jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
    );
};

const decodeToken = (token: string) => {
    return jwt.verify(token, process.env.JWT_SECRET as string);
};

export { generateToken, decodeToken };
