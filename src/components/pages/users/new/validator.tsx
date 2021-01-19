import Joi from 'joi'
import User from 'models/user'
import { lettersOnly, notNull, alphaNumeric } from 'utils/helper'

export default {
  username: alphaNumeric('Username').min(6).max(50),
  password: alphaNumeric('Password').min(8).max(65),
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
} as User
