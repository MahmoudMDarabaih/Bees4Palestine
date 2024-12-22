import { Router } from 'express';
import { registerNewUserController, LoginController, logoutController } from '../controllers/authController';
import validateRequest from '../middlewares/validateRequest';
import { loginSchema, registerNewUserSchema } from '../validators/userValidator';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.post('/signup',
    validateRequest({ bodySchema: registerNewUserSchema }),
    registerNewUserController);
router.post('/login',
    validateRequest({ bodySchema: loginSchema }),
    LoginController);
router.get('/logout',
    authMiddleware,
    logoutController);

export default router;
