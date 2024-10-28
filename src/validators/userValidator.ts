import Joi, { ObjectSchema } from 'joi';

export const userRegistrationSchema: ObjectSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});
