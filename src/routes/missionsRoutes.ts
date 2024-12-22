import { Router } from 'express';
import { registerNewUserController, LoginController, logoutController } from '../controllers/authController';
import validateRequest from '../middlewares/validateRequest';
import { createMissionSchema } from '../validators/missionValidators';
import adminMiddleware from '../middlewares/adminMiddleware';
import { createMission } from '../controllers/missionsController';

const missionsRouter = Router();

missionsRouter.post('/create',
    validateRequest({ bodySchema: createMissionSchema }),
   // adminMiddleware,
    createMission
    );



export default missionsRouter;