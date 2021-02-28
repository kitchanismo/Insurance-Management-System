import Joi from 'joi'
import { lettersOnly, notNull } from 'utils/helper'

const editUserValidator = {
  username: Joi.string().alphanum().min(1).max(50).required().label('Username'),
  firstname: lettersOnly('Firstname').min(1).max(255).required(),
  middlename: lettersOnly('Middlename').min(1).max(255).required(),
  lastname: lettersOnly('Lastname').min(1).max(255).required(),
  branch: notNull('Branch'),
  role: notNull('Role'),
}

export default editUserValidator
