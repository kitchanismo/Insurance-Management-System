import Client from 'models/client'
import * as React from 'react'

export interface ClientProps {
  clients: Client[]
  computeTotalPaid: (client: Client) => number
  computeTotalPay: (client: Client) => number
  getClient: (id: number) => Promise<Client>
  onLoadClients: () => Promise<void>
  isLoading: boolean
}

const ClientContext = React.createContext<ClientProps | null>(null)

export default ClientContext
