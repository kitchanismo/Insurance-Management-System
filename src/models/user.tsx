import Joi from 'joi'
import Profile from './profile'

//to give types in validator object
interface User extends Profile {
  username: string | Joi.StringSchema
  password: string | Joi.StringSchema
  branch: string
  position:
    | 'Sales Agent'
    | 'Branch Manager'
    | 'Agency Manager'
    | 'Supervisor'
    | 'Admin'
    | Joi.StringSchema
    | ''
  team?: string
  is_active?: boolean | Joi.BooleanSchema
  is_delete?: boolean | Joi.BooleanSchema
  sales?: number | Joi.NumberSchema
  is_darkmode?: boolean
  created_at: Date
}

interface Team {
  id?: number | Joi.NumberSchema
  name: string | Joi.StringSchema
  is_leader?: boolean | Joi.BooleanSchema
  branch?: string
}

export default User
