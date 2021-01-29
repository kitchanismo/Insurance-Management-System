import Client from 'models/client'
import * as React from 'react'

export interface ClientProps {
  clients: Client[]
}

const ClientContext = React.createContext<ClientProps | null>(null)

export default ClientContext
