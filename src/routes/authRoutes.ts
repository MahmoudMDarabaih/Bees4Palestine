import { Router } from 'express';
import { registerNewUserController, LoginController, logoutController } from '../controllers/authController';
import validateRequest from '../middlewares/validateRequest';
import { loginSchema, registerNewUserSchema } from '../validators/userValidator';
import authMiddleware from '../middlewares/authMiddleware';

const authRouter = Router();

authRouter.post('/signup',
    validateRequest({ bodySchema: registerNewUserSchema }),
    registerNewUserController);
authRouter.post('/login',
    validateRequest({ bodySchema: loginSchema }),
    LoginController);
authRouter.get('/logout',
    authMiddleware,
    logoutController);

export default authRouter;
