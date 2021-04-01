import Joi from 'joi'
import { NumberSchema } from 'joi'
import Client from './client'
import Profile from './profile'
import Position from './position'
import Branch from './branch'

//to give types in validator object
interface Employee extends Profile {
  position?: Position
  branch?: Branch
  team?: string
  status?: 'active' | 'deactive' | 'deceased'
  is_delete?: boolean
  commission_amount?: number
  is_darkmode?: boolean
  created_at?: Date
  clients?: Client[]
  profile?: Profile
  commissions?: number[]
}

export default Employee
