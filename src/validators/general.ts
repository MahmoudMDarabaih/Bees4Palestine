import Joi from "joi";

export const ID_Schema = Joi.object({
    id: Joi.number().integer().positive().required()
        .messages({
            'any.required': 'Mission ID is required.',
            'number.base': 'Mission ID must be a number.',
            'number.integer': 'Mission ID must be an integer.',
            'number.positive': 'Mission ID must be a positive number.'
        }),
});