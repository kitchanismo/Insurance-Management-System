import Joi from 'joi'
import { lettersOnly, notNull } from 'utils/helper'

const saveProfileValidator = {
  firstname: lettersOnly('Firstname').min(1).max(50),
  middlename: lettersOnly('Middlename').min(1).max(50),
  lastname: lettersOnly('Lastname').min(1).max(50),
  civil: notNull('Civil Status'),
  gender: notNull('Gender'),
}

export default saveProfileValidator
