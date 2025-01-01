import { Router } from 'express';
import validateRequest from '../middlewares/validateRequest';
import { createMissionSchema, updateMissionSchema } from '../validators/missionValidators';
import adminMiddleware from '../middlewares/adminMiddleware';
import { createMission, getAllMissions, getMission, getMissionsByPlatform, getMissionsByType, deleteMissions, updateMissionByID } from '../controllers/missionsController';
import authMiddleware from '../middlewares/authMiddleware';
import { ID_Schema } from '../validators/general';
import { handleMissionImageUpload } from '../middlewares/upload.middleware';

const missionsRouter = Router();

missionsRouter.post('/',
    handleMissionImageUpload,
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
    validateRequest({ paramsSchema: ID_Schema }),
    getMission
);
missionsRouter.get('/platform/:id',
    authMiddleware,
    validateRequest({ paramsSchema: ID_Schema }),
    getMissionsByPlatform
);
missionsRouter.get('/type/:id',
    authMiddleware,
    validateRequest({ paramsSchema: ID_Schema }),
    getMissionsByType
);
missionsRouter.delete('/:id',
    authMiddleware,
    adminMiddleware,
    validateRequest({ paramsSchema: ID_Schema }),
    deleteMissions
);
missionsRouter.put('/:id',
    authMiddleware,
    adminMiddleware,
    validateRequest({ paramsSchema: ID_Schema }),
    validateRequest({ bodySchema: updateMissionSchema }),
    updateMissionByID
);




export default missionsRouter;