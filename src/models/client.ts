import { Plan } from 'models/plan'
import Employee from 'models/employee'
import Profile from './profile'

interface Client extends Profile {
  plan?: Plan
  code?: string
  payment_mode?: 'Installment' | 'Fullpayment'
  balance?: number
  payment_count?: number
  payment_period?: 'Monthly' | 'Quarterly' | 'Semi-Annually' | 'Annually'
  is_delete?: boolean
  created_at?: Date
  branch?: number
  employee?: number
  years_to_pay?: number
  profile?: Profile
}

export default Client
