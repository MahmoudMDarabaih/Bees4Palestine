import { addAction, deleteActionService, getActionService, getAllActionsService } from "../services/actions.service";
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

export const getAllActions = errorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await getAllActionsService()
        if (result.length !== 0) {
            res.status(200).json(
                {
                    actionsCount: result.length,
                    action: result
                }
            );
        }
        else {
            next(new APIError("no actions items!", 401));
        }
    }
)
export const getAction = errorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const result = await getActionService(id)
        if (result.length === 0 || !result) {
            next(new APIError("no action item found!", 401));

        }
        else {
            res.status(200).json(
                {
                    status: "success",
                    action: result[0]
                }
            );
        }

    }
)

export const deleteAction = errorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const id = req.params.id;
        const result = await deleteActionService(id)
        if (result) {
            res.status(200).json(
                {
                    status: `success fully deleted the Action with id: ${id}`,
                }
            );
        }
        else {
            next(new APIError("Failed to delete the action", 404));
        }
    }
)

