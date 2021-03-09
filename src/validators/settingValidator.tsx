import Joi from 'joi'
import { notNull } from 'utils/helper'

const settingValidator = {
  apiCode: notNull('API Code'),
  apiPassword: notNull('API Password'),
}

export default settingValidator
