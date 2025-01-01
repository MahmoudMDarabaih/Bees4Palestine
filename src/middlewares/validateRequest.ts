import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import APIError from '../utils/types/APIError';

const validateRequest = (options: {
  bodySchema?: Joi.ObjectSchema,
  paramsSchema?: Joi.ObjectSchema,
  querySchema?: Joi.ObjectSchema,
}) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { bodySchema, paramsSchema, querySchema } = options;
    // Validate request body if bodySchema is provided
    if (bodySchema && req.body) {
      parseStringToJson(req);
      const { error } = bodySchema.validate(req.body, { abortEarly: false });
      if (error) {
        const errors: string = error.details.map((err) => err.message).join(', ');
        return next(new APIError(errors, 400));
      }
    }

    // Validate request params if paramsSchema is provided
    if (paramsSchema && req.params) {
      const { error } = paramsSchema.validate(req.params, { abortEarly: false });
      if (error) {
        const errors: string = error.details.map((err) => err.message).join(', ');
        return next(new APIError(errors, 400));
      }
    }

    // Validate request query if querySchema is provided
    if (querySchema && req.query) {
      const { error } = querySchema.validate(req.query, { abortEarly: false });
      if (error) {
        const errors: string = error.details.map((err) => err.message).join(', ');
        return next(new APIError(errors, 400));
      }
    }
    next();
  };
};
export default validateRequest;


///////
const parseStringToJson = (req: Request): void => {
  if (!req.body) return; // Early return if req.body is null or undefined

  // Use a type guard to ensure req.body is not null
  Object.keys(req.body).forEach(key => {
    const value = req.body[key];

    // Only attempt to parse string values
    if (typeof value === 'string') {
      try {
        // Attempt to parse the string as JSON
        const parsedValue = JSON.parse(value);
        // Update the field with parsed value if successful
        req.body[key] = parsedValue;
      } catch (error) {
        // If parsing fails, keep the original value
        // This means it wasn't a JSON string
        // No need to do anything as we keep the original value
      }
    }
  });
};
