import Profile from './profile'

interface Client extends Profile {
  plan:
    | 'Plan 1'
    | 'Plan 2'
    | 'Plan 3'
    | 'Plan 4'
    | 'Plan 5'
    | 'Plan 6'
    | 'Plan 7'
    | 'Plan 8'
  code: string
  payment_mode: 'Installment' | 'Fullpayment'
  balance: number
  payment_count: number
  payment_period: 'Monthly' | 'Quarterly' | 'Semi-Annually' | 'Annually'
  is_delete: boolean
  end_date: Date
  branch: string
  initials: string
  created_at: Date
}

export default Client
