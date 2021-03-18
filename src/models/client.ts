import { Plan } from 'models/plan'
import Employee from 'models/employee'
import Profile from './profile'
import Branch from './branch'

interface Client extends Profile {
  plan?: Plan
  code?: string
  payment_mode?: 'Installment' | 'Fullpayment'
  balance?: number
  payment_count?: number
  payment_period?: 'Monthly' | 'Quarterly' | 'Semi-Annually' | 'Annually'
  is_delete?: boolean
  created_at?: Date
  employee?: number
  years_to_pay?: number
  profile?: Profile
  branch?: Branch
  next_payment?: Date
  is_pwd: boolean
}

export default Client
