import { Router } from 'express';
import { registerNewUserController, LoginController, logoutController } from '../controllers/authController';
import validateRequest from '../middlewares/validateRequest';
import { createMissionSchema, getMissionSchema } from '../validators/missionValidators';
import adminMiddleware from '../middlewares/adminMiddleware';
import { createMission, getAllMissions, getMission, getMissionsByPlatform, getMissionsByType } from '../controllers/missionsController';
import authMiddleware from '../middlewares/authMiddleware';

const missionsRouter = Router();

missionsRouter.post('/',
    authMiddleware,
    validateRequest({ bodySchema: createMissionSchema }),
    adminMiddleware,
    createMission
);
missionsRouter.get('/',
    authMiddleware,
    getAllMissions
);
missionsRouter.get('/:id',
    authMiddleware,
    getMission
);
missionsRouter.get('/platform/:id',
    authMiddleware,
    getMissionsByPlatform
);
missionsRouter.get('/type/:id',
    authMiddleware,
    getMissionsByType
);




export default missionsRouter;