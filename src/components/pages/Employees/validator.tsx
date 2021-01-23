import Joi from 'joi'
import Employee from 'models/employee'
import { lettersOnly, notNull, alphaNumeric } from 'utils/helper'

export default {
  firstname: lettersOnly('Firstname').min(1).max(50),
  middlename: lettersOnly('Middlename').min(1).max(50),
  lastname: lettersOnly('Lastname').min(1).max(50),
  position: notNull('Position'),
  civil: notNull('Civil Status'),
  gender: notNull('Gender'),
  branch: notNull('Branch'),
  team: Joi.optional(),
  contact: Joi.optional(),
  address: Joi.optional(),
  birthdate: Joi.optional(),
} as Employee
