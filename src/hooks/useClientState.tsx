import { createContext, Dispatch, useReducer } from 'react'

import Client from 'models/client'

export const ClientContext = createContext<
  [state: ClientState, dispatch: Dispatch<ClientAction>] | null
>(null)

export interface ClientState {
  clients: Client[]
  isLoading: boolean
}

export type ClientAction =
  | { type: 'toggleLoading' }
  | { type: 'onLoad'; payload: Client[] }
  | { type: 'setIsLoading'; payload: boolean }

const clientReducer = (state: ClientState, action: ClientAction) => {
  switch (action.type) {
    case 'onLoad':
      return { ...state, clients: action.payload, isLoading: false }
    case 'setIsLoading':
      return { ...state, isLoading: action.payload }
    case 'toggleLoading':
      return { ...state, isLoading: !state.isLoading }
    default:
      return state
  }
}

const useClientState = () => {
  const reducer = useReducer(clientReducer, {
    clients: [],
    isLoading: false,
  })

  return reducer
}

export default useClientState
