import useClientState, { ClientState, ClientAction } from 'hooks/useClientState'
import { Dispatch, createContext } from 'react'

export const ClientContext = createContext<
  [state: ClientState, dispatch: Dispatch<ClientAction>] | null
>(null)

export const ClientProvider: React.FC = (props) => {
  const { state, dispatch } = useClientState()
  return (
    <ClientContext.Provider value={[state, dispatch]}>
      {props.children}
    </ClientContext.Provider>
  )
}
