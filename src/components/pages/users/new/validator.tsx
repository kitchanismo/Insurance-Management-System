import Joi from 'joi'
import User from 'models/user'
import { lettersOnly } from 'utils/helper'

export default {
  username: Joi.string().alphanum().min(6).max(50).required().label('Username'),
  firstname: lettersOnly('Firstname').min(1).max(50),
  middlename: lettersOnly('Middlename').min(1).max(50),
  lastname: lettersOnly('Lastname').min(1).max(50),
  position: Joi.required().not(null).messages({
    'any.invalid': `"Position" is a required`,
  }),
  civil: Joi.required().not(null).messages({
    'any.invalid': `"Civil Status" is a required`,
  }),
  gender: Joi.required().not(null).messages({
    'any.invalid': `"Gender" is a required`,
  }),
  branch: Joi.required().not(null).messages({
    'any.invalid': `"Branch" is a required`,
  }),
  team: Joi.optional(),
  contact: Joi.optional(),
  address: Joi.optional(),
  birthdate: Joi.optional(),
  password: Joi.string().min(8).max(65).required().label('Password'),
} as User
