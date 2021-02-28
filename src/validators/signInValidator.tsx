import Joi from 'joi'
import { notNull } from 'utils/helper'

const signInValidator = {
  username: notNull('Username'),
  password: Joi.string().min(8).max(50).required().label('Password'),
}

export default signInValidator
