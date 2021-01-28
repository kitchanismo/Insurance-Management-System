import Joi from 'joi'
import { lettersOnly, notNull } from 'utils/helper'

const saveTransactionValidator = {
  plan: notNull('Plan'),
  payment_mode: notNull('Payment Mode'),
  branch_manager: notNull('Branch Manager'),
  agency_manager: notNull('Agency Manager'),
  supervisor: notNull('Supervisor'),
  sales_agent: Joi.optional(),
  position: notNull('Position'),
  insured_employee: Joi.optional(),
  payment_period: Joi.when('payment_mode', {
    is: Joi.string().valid('Fullpayment'),
    then: Joi.valid(null),
    otherwise: notNull('Payment Period'),
  }),
}

export default saveTransactionValidator
