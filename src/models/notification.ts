import Client from 'models/client'
interface Notification {
  id?: number
  message?: string
  client?: Client
  is_read?: boolean
  is_sent?: boolean
  type?: 'near' | 'lapse'
}

export default Notification
