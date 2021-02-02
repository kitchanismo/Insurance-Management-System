import Joi from 'joi'
import Profile from './profile'

//to give types in validator object
interface Employee extends Profile {
  position?: 'Sales Agent' | 'Branch Manager' | 'Agency Manager' | 'Supervisor'
  branch?: string
  team?: string
  status?: 'active' | 'deactive' | 'deceased'
  is_delete?: boolean
  commission_amount?: number
  is_darkmode?: boolean
  created_at?: Date
  image?: HTMLImageElement
}

export default Employee
