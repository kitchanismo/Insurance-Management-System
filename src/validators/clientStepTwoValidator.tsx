import Joi from 'joi'
import { lettersOnly, notNull } from 'utils/helper'

const clientStepTwoValidator = {
  branch_manager: notNull('Branch Manager'),
  agency_manager: notNull('Agency Manager'),
  supervisor: notNull('Supervisor'),
  sales_agent: Joi.optional(),
  position: notNull('Position'),
  insured_employee: Joi.optional(),
}

export default clientStepTwoValidator
