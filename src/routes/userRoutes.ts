import { Router } from 'express';
import { registerUser } from '../controllers/userController';
import { validateRequest } from '../middlewares/validateRequest';
import { userRegistrationSchema } from '../validators/userValidator';

const router = Router();

router.post('/register', validateRequest(userRegistrationSchema), registerUser);

export default router;
