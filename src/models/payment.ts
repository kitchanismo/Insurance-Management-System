import Client from './client'

interface Payment {
  id?: number
  amount?: number
  or_number?: string
  client?: Client
  created_at?: Date
  hasCommission?: boolean
}

export default Payment
