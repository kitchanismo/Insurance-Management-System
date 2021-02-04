import Joi from 'joi'
import { lettersOnly, notNull } from 'utils/helper'

const clientTransactionValidator = {
  branch_manager: notNull('Branch Manager'),
  agency_manager: notNull('Agency Manager'),
  supervisor: notNull('Supervisor'),
  position: notNull('Position'),
  amount: Joi.number().positive().not(0).required().label('Amount'),
  payment_mode: notNull('Payment Mode'),
  or_number: notNull('OR Number'),
}

export default clientTransactionValidator
