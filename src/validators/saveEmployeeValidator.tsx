import Joi from 'joi'
import Employee from 'models/employee'
import { lettersOnly, notNull } from 'utils/helper'

const saveEmployeeValidator = {
  firstname: lettersOnly('Firstname').min(1).max(50),
  middlename: lettersOnly('Middlename').min(1).max(50),
  lastname: lettersOnly('Lastname').min(1).max(50),
  position: notNull('Position'),
  status: notNull('Status'),
  civil: notNull('Civil Status'),
  gender: notNull('Gender'),
  branch: notNull('Branch'),
}

export default saveEmployeeValidator
