import useClientState from 'hooks/useClientState'
import * as React from 'react'
import ClientContext from '../contexts/clientContext'

export const ClientProvider: React.FC = (props) => {
  const clientState = useClientState()
  return (
    <ClientContext.Provider value={{ ...clientState }}>
      {props.children}
    </ClientContext.Provider>
  )
}
