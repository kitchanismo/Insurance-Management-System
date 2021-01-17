import Joi from 'joi'

//to give types in validator object
interface User {
  username: string | Joi.StringSchema
  first_name: string | Joi.StringSchema
  last_name: string | Joi.StringSchema
  email?: string | Joi.StringSchema
  password: string | Joi.StringSchema
}

export default User
