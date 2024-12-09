import { Router } from 'express';
import { registerUser } from '../controllers/userController';
import validateRequest from '../middlewares/validateRequest';
import { registerNewUserSchema } from '../validators/userValidator';

const router = Router();

router.post('/signup',
    validateRequest({ bodySchema: registerNewUserSchema }),
    registerUser);

export default router;
