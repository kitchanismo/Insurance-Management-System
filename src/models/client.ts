import Employee from 'models/employee'
import Profile from './profile'

interface Client extends Profile {
  plan?:
    | 'Plan 1'
    | 'Plan 2'
    | 'Plan 3'
    | 'Plan 4'
    | 'Plan 5'
    | 'Plan 6'
    | 'Plan 7'
    | 'Plan 8'
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
}

export default Client
