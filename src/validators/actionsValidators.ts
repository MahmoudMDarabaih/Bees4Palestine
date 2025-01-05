import Joi, { ObjectSchema } from "joi";

export const createActionSchema: ObjectSchema = Joi.object({
    name: Joi.object({
        ar: Joi.string()
            .required()
            .min(3)
            .max(50)
            .trim()
            .messages({
                'string.min': 'name in Arabic must be at least 3 characters long',
                'string.max': 'name in Arabic cannot exceed 50 characters',
                'any.required': 'name in Arabic is required',
                'string.empty': 'name in Arabic cannot be empty',
            }),
        en: Joi.string()
            .required()
            .min(3)
            .max(50)
            .trim()
            .messages({
                'string.min': 'name in English must be at least 3 characters long',
                'string.max': 'name in English cannot exceed 50 characters',
                'any.required': 'name in English is required',
                'string.empty': 'name in English cannot be empty',
            }),
    })
        .required()
        .messages({
            'any.required': 'names are required',
            'object.base': 'name must be an object with ar and en properties',
        }),
    platformID: Joi.number()
        .required()
        .messages({
            'any.required': 'The Platform ID is required',
        }),
});