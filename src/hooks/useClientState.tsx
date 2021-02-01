import { createContext, Dispatch, useEffect, useReducer } from 'react'

import Client from 'models/client'
import Plan from 'models/plan'
import { getPlans } from 'api/clientService'

export interface ClientState {
  clients: Client[]
  plans: Plan[]
  isLoading: boolean
  onReloadPlans: boolean
}

export type ClientAction =
  | { type: 'toggleLoading' | 'onReloadPlans' }
  | { type: 'onLoadClients'; payload: Client[] }
  | { type: 'onLoadPlans'; payload: Plan[] }
  | { type: 'setIsLoading'; payload: boolean }

const clientReducer = (state: ClientState, action: ClientAction) => {
  switch (action.type) {
    case 'onLoadPlans':
      return { ...state, plans: action.payload }
    case 'onReloadPlans':
      return { ...state, onReloadPlans: !state.onReloadPlans }
    case 'onLoadClients':
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
  const [state, dispatch] = useReducer(clientReducer, {
    clients: [],
    plans: [],
    isLoading: false,
    onReloadPlans: false,
  })

  useEffect(() => {
    getPlans().then((plans) => {
      dispatch({ type: 'onLoadPlans', payload: plans })
    })
  }, [state.onReloadPlans])

  return { state, dispatch }
}

export default useClientState
