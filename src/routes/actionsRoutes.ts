import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware";
import adminMiddleware from "../middlewares/adminMiddleware";
import validateRequest from "../middlewares/validateRequest";
import { createActionSchema } from "../validators/actionsValidators";
import { createAction } from "../controllers/createActionController";

const actionsRouter = Router();

actionsRouter.route('/')
    .post(
        authMiddleware,
        adminMiddleware,
        validateRequest({ bodySchema: createActionSchema }),
        createAction
    )

export default actionsRouter;