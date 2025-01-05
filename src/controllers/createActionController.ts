import { addAction, getActionService } from "../services/actions.service";
import errorHandler from "../utils/functions/errorHandler";
import { NextFunction, Request, Response } from 'express';
import APIError from "../utils/types/APIError";

export const createAction = errorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const { name, platformID } = req.body;
        const result = await addAction(name, platformID)
        if (result.insertId) {
            const newAction = await getActionService(result.insertId);
            res.status(201).json(
                {
                    message: "created new action successfully",
                    action: newAction
                }
            );
        }
        else {
            next(new APIError(result.sqlMessage, 401));
        }
    }
)

