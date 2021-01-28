import Joi from 'joi'
import { lettersOnly, notNull } from 'utils/helper'

const saveTransactionValidator = {
  plan: notNull('Plan'),
  payment_mode: notNull('Payment Mode'),
  payment_period: notNull('Payment Period'),
  branch_manager: notNull('Branch Manager'),
  agency_manager: notNull('Agency Manager'),
  supervisor: notNull('Supervisor'),
  sales_agent: Joi.optional(),
  position: notNull('Position'),
  insured_employee: Joi.optional(),
}

export default saveTransactionValidator
