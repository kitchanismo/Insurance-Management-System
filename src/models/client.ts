import Employee from 'models/employee'
import Profile from './profile'

interface Client extends Profile {
  plan?: 'Plan 1' | 'Plan 2' | 'Plan 3'
  code?: string
  payment_mode?: 'Installment' | 'Fullpayment'
  balance?: number
  payment_count?: number
  payment_period?: 'Monthly' | 'Quarterly' | 'Semi-Annually' | 'Annually'
  is_delete?: boolean
  end_date?: Date
  branch?: string
  insured_employee?: string
  years_to_pay?: number
  created_at?: Date
}

export default Client
