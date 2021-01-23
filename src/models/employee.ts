import Joi from 'joi'
import Profile from './profile'

//to give types in validator object
interface Employee extends Profile {
  branch: string | Joi.StringSchema | null
  position:
    | 'Sales Agent'
    | 'Branch Manager'
    | 'Agency Manager'
    | 'Supervisor'
    | 'Admin'
    | Joi.StringSchema
    | null
  team?: string | Joi.StringSchema | null
  is_active?: boolean | Joi.BooleanSchema
  is_delete?: boolean | Joi.BooleanSchema
  sales?: number | Joi.NumberSchema
  is_darkmode?: boolean
  created_at?: Date
}

interface Team {
  id?: number | Joi.NumberSchema
  name: string | Joi.StringSchema
  is_leader?: boolean | Joi.BooleanSchema
  branch?: string
}

export default Employee
