import Joi from 'joi';
import { Role } from '../utils/enums';

export const register = {
    body: Joi.object({
        name:Joi.string().required(),
        surname:Joi.string().required(),
        email:Joi.string().email().required(),
        password:Joi.string().required(),
        age:Joi.number().required(),
        role:Joi.string().required().valid(...Object.values(Role))
    })
}