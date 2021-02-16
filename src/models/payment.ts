import Client from './client'
import Commission from './commissions'

interface Payment {
  id?: number
  amount?: number
  or_number?: string
  client?: Client
  created_at?: Date
  hasCommission?: boolean
  commissions?: Commission[]
}

export default Payment
