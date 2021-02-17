import Joi from 'joi'
import { lettersOnly, notNull } from 'utils/helper'

const saveBranchValidator = {
  name: Joi.string().required().label('Branch'),
}

export default saveBranchValidator
