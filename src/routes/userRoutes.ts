import { Router } from 'express';
import { registerUser, userLogin } from '../controllers/userController';
import validateRequest from '../middlewares/validateRequest';
import { loginSchema, registerNewUserSchema } from '../validators/userValidator';

const router = Router();

router.post('/signup',
    validateRequest({ bodySchema: registerNewUserSchema }),
    registerUser);
router.post('/login',
    validateRequest({ bodySchema: loginSchema }),
    userLogin);

export default router;
