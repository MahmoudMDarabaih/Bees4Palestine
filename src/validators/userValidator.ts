import Joi, { ObjectSchema } from 'joi';


export const registerNewUserSchema: ObjectSchema = Joi.object({
    firstName: Joi.string()
        .min(3)
        .max(20)
        .required()
        .messages({
            'string.base': 'First name must be a string',
            'string.min': 'First name must be at least 3 characters long',
            'string.max': 'First name must be less than or equal to 20 characters long',
            'any.required': 'First name is required',
        }),
    lastName: Joi.string()
        .min(3)
        .max(20)
        .required()
        .messages({
            'string.base': 'Last name must be a string',
            'string.min': 'Last name must be at least 3 characters long',
            'string.max': 'Last name must be less than or equal to 20 characters long',
            'any.required': 'Last name is required',
        }),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.email': 'Invalid email format',
        'any.required': 'Email is required',
    }),
    password: Joi.string()
        .min(8)
        .required()
        .pattern(/[A-Z]/, 'uppercase letter')
        .pattern(/[a-z]/, 'lowercase letter')
        .pattern(/\d/, 'number')
        .pattern(/[\W_]/, 'special character')
        .messages({
            'string.min': 'Password must be at least 8 characters long',
            'string.pattern.name': 'Password must contain at least one {#name}',
            'any.required': 'Password is required',
        }),
    invitationCode: Joi.string()
        .length(36)
        .required()
        .messages({
            'string.base': 'Invitation code must be a string',
            'string.length': 'Invitation code must be exactly 36 characters long',
            'any.required': 'Invitation code is required',
        }),

});

export const loginSchema: ObjectSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.email': 'Invalid email format',
        'any.required': 'Email is required',
    }),
    password: Joi.string()
        .min(8)
        .required()
        .messages({
            'string.min': 'Password must be at least 8 characters long',
            'any.required': 'Password is required',
        }),
});