import useClientState from 'hooks/useClientState'
import * as React from 'react'
import { ClientContext } from 'hooks/useClientState'

export const ClientProvider: React.FC = (props) => {
  const { state, dispatch } = useClientState()
  return (
    <ClientContext.Provider value={[state, dispatch]}>
      {props.children}
    </ClientContext.Provider>
  )
}
