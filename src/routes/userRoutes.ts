import { Router } from 'express';
import { registerUser } from '../controllers/userController';
import validateRequest from '../middlewares/validateRequest';
import { loginSchema, registerNewUserSchema } from '../validators/userValidator';

const router = Router();

router.post('/signup',
    validateRequest({ bodySchema: registerNewUserSchema }),
    registerUser);
router.post('/login',
    validateRequest({ bodySchema: loginSchema }),
    registerUser);

export default router;
