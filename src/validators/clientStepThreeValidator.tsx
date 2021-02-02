import Joi from 'joi'
import { lettersOnly, notNull } from 'utils/helper'

const clientStepThreeValidator = {
  plan: notNull('Plan'),
  insured_employee: Joi.optional(),
  amount: Joi.number().required().label('Amount'),
  payment_mode: notNull('Payment Mode'),
  or_number: notNull('OR Number'),
  years_to_pay: Joi.optional(),
  payment_period: Joi.when('payment_mode', {
    is: Joi.string().valid('Fullpayment'),
    then: Joi.valid(null),
    otherwise: notNull('Payment Period'),
  }),
}

export default clientStepThreeValidator
