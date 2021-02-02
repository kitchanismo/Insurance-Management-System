import Joi from 'joi'
import { notNull } from 'utils/helper'

const signInValidator = {
  username: notNull('Username'),
  password: notNull('Password'),
}

export default signInValidator
