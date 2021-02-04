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
  | { type: 'TOGGLE_LOADING' | 'ON_RELOAD_PLANS' }
  | { type: 'ON_LOAD_CLIENTS'; payload: Client[] }
  | { type: 'ON_LOAD_CLIENTS_INSTALLMENT'; payload: Client[] }
  | { type: 'ON_LOAD_PLANS'; payload: Plan[] }
  | { type: 'SET_IS_LOADING'; payload: boolean }

const clientReducer = (state: ClientState, action: ClientAction) => {
  switch (action.type) {
    case 'ON_LOAD_PLANS':
      return { ...state, plans: action.payload }
    case 'ON_RELOAD_PLANS':
      return { ...state, onReloadPlans: !state.onReloadPlans }
    case 'ON_LOAD_CLIENTS':
      return { ...state, clients: action.payload, isLoading: false }
    case 'ON_LOAD_CLIENTS_INSTALLMENT':
      const clients = action.payload.filter(
        (client) => client.payment_mode === 'Installment',
      )
      return { ...state, clients, isLoading: false }
    case 'SET_IS_LOADING':
      return { ...state, isLoading: action.payload }
    case 'TOGGLE_LOADING':
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
      dispatch({ type: 'ON_LOAD_PLANS', payload: plans })
    })
  }, [state.onReloadPlans])

  return { state, dispatch }
}

export default useClientState
