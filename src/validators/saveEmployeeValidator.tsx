import Joi from 'joi'
import { lettersOnly, notNull } from 'utils/helper'

const saveEmployeeValidator = {
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
  image: Joi.optional(),
  imageUrl: Joi.optional(),
}

export default saveEmployeeValidator
