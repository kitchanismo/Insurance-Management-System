import Joi from 'joi'
import { NumberSchema } from 'joi'
import Client from './client'
import Profile from './profile'

//to give types in validator object
interface Employee extends Profile {
  position?: number
  branch?: number
  team?: string
  status?: 'active' | 'deactive' | 'deceased'
  is_delete?: boolean
  commission_amount?: number
  is_darkmode?: boolean
  created_at?: Date
  image?: Blob
  imageUrl?: string
  clients?: Client[]
}

export default Employee
