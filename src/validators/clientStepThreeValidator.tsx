import Joi from 'joi'
import { lettersOnly, notNull } from 'utils/helper'

const clientStepThreeValidator = {
  plan: notNull('Plan'),
  insured_employee: Joi.optional(),
  payment_mode: notNull('Payment Mode'),
  payment_period: Joi.when('payment_mode', {
    is: Joi.string().valid('Fullpayment'),
    then: Joi.valid(null),
    otherwise: notNull('Payment Period'),
  }),
}

export default clientStepThreeValidator
