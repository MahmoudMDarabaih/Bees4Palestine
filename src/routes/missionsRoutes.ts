import { Router } from 'express';
import validateRequest from '../middlewares/validateRequest';
import { createMissionSchema } from '../validators/missionValidators';
import adminMiddleware from '../middlewares/adminMiddleware';
import { createMission, getAllMissions, getMission, getMissionsByPlatform, getMissionsByType, deleteMissions } from '../controllers/missionsController';
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
missionsRouter.delete('/:id',
    authMiddleware,
    adminMiddleware,
    deleteMissions
);




export default missionsRouter;