import Joi, { ObjectSchema } from "joi";

export const createMissionSchema: ObjectSchema = Joi.object({
    title: Joi.object({
        ar: Joi.string()
            .required()
            .min(3)
            .max(250)
            .trim()
            .messages({
                'string.min': 'title in Arabic must be at least 3 characters long',
                'string.max': 'title in Arabic cannot exceed 200 characters',
                'any.required': 'title in Arabic is required',
                'string.empty': 'title in Arabic cannot be empty',
            }),
        en: Joi.string()
            .required()
            .min(3)
            .max(250)
            .trim()
            .messages({
                'string.min': 'title in English must be at least 3 characters long',
                'string.max': 'title in English cannot exceed 200 characters',
                'any.required': 'title in English is required',
                'string.empty': 'title in English cannot be empty',
            }),
    })
        .required()
        .messages({
            'any.required': 'Titles are required',
            'object.base': 'Titles must be an object with ar and en properties',
        }),
    description: Joi.object({
        ar: Joi.string()
            .required()
            .min(10)
            .max(1000)
            .trim()
            .messages({
                'string.min': 'description in Arabic must be at least 10 characters long',
                'string.max': 'description in Arabic cannot exceed 1000 characters',
                'any.required': 'description in Arabic is required',
                'string.empty': 'description in Arabic cannot be empty',
            }),
        en: Joi.string()
            .required()
            .min(10)
            .max(1000)
            .trim()
            .messages({
                'string.min': 'description in English must be at least 10 characters long',
                'string.max': 'description in English cannot exceed 1000 characters',
                'any.required': 'description in English is required',
                'string.empty': 'description in English cannot be empty',
            }),
    })
        .required()
        .messages({
            'any.required': 'Descriptions are required',
            'object.base': 'Descriptions must be an object with ar and en properties',
        }),
    platformID: Joi.number()
        .required()
        .messages({
            'any.required': 'The Platform ID is required',
        }),
    stars: Joi.number()
        .min(1)
        .max(5)
        .required()
        .messages({
            'string.min': 'Stars should be 1 to 5 stars per mission',
            'string.max': 'Stars should be 1 to 5 stars per mission',
            'any.required': 'The stars count is required',
        }),
    expirationDate: Joi.date()
        .greater('now')
        .required()
        .messages({
            'date.base': 'Expiration date must be a valid date.',
            'date.greater': 'Expiration date must be in the future.',
            'any.required': 'Expiration date is required.',
        }),
    status: Joi.string()
        .valid('active', 'disabled', 'finished')
        .required()
        .messages({
            'any.only': 'Status must be one of the following: active, disabled, or finished.',
            'any.required': 'Status is required.',
            'string.base': 'Status must be a string.',
        }),
    type: Joi.string()
        .valid('Strike', 'Support')
        .required()
        .messages({
            'any.only': 'Type must be one of the following: Strike or Support.',
            'any.required': 'Type is required.',
            'string.base': 'Type must be a string.',
        }),
    actions: Joi.object(),
});