import Joi from 'joi'
import { lettersOnly, notNull } from 'utils/helper'

const saveUserValidator = {
  username: Joi.string().alphanum().min(1).max(50).required().label('Username'),
  password: Joi.string().min(8).max(50).required().label('Password'),
  firstname: lettersOnly('Firstname').min(3).max(255).required(),
  middlename: lettersOnly('Middlename').min(3).max(255).required(),
  lastname: lettersOnly('Lastname').min(3).max(255).required(),
  branch: notNull('Branch'),
  role: notNull('Role'),
}

export default saveUserValidator
