import { Router } from 'express';
import userRoutes from './authRoutes';

const router = Router();

router.use('/users', userRoutes);

export default router;
