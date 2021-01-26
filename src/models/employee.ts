import Joi from 'joi'
import Profile from './profile'

//to give types in validator object
interface Employee extends Profile {
  position?:
    | 'Sales Agent'
    | 'Branch Manager'
    | 'Agency Manager'
    | 'Supervisor'
    | Joi.StringSchema
    | null
  branch?: string | Joi.StringSchema | null
  team?: string | Joi.StringSchema | null
  status?: 'active' | 'deactive' | 'deceased'
  is_delete?: boolean
  commission_amount?: number
  is_darkmode?: boolean
  created_at?: Date
}

export default Employee
