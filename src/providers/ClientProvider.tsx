import { createContext, Dispatch, useEffect, useReducer } from 'react'
import { produce } from 'immer'
import Client from 'models/client'
import Plan from 'models/plan'
import { plans } from 'services/clientService'

export const ClientContext = createContext<
  [state: ClientState, dispatch: Dispatch<ClientAction>] | null
>(null)

interface ClientState {
  clients: Client[]
  plans: Plan[]
  isLoading: boolean
  onReloadPlans: boolean
  pages: number
  total: number
}

export type ClientAction =
  | { type: 'TOGGLE_LOADING' | 'ON_RELOAD_PLANS' }
  | {
      type: 'ON_LOAD_CLIENTS'
      payload: { clients: Client[]; total?: number; pages?: number }
    }
  | { type: 'ON_LOAD_CLIENTS_INSTALLMENT'; payload: Client[] }
  | { type: 'ON_LOAD_PLANS'; payload: Plan[] }
  | { type: 'SET_IS_LOADING'; payload: boolean }
  | { type: 'SET_TOTAL'; payload: number }
  | { type: 'SET_PAGES'; payload: number }

const reducer = (state: ClientState, action: ClientAction) => {
  switch (action.type) {
    case 'ON_LOAD_PLANS':
      state.plans = action.payload
      break
    case 'ON_RELOAD_PLANS':
      state.onReloadPlans = !state.onReloadPlans
      break
    case 'ON_LOAD_CLIENTS':
      state.clients = action.payload.clients
      state.total = action.payload.total!
      state.pages = action.payload.pages!
      state.isLoading = false
      break
    case 'ON_LOAD_CLIENTS_INSTALLMENT':
      state.clients = action.payload.filter(
        (client) => client.payment_mode === 'Installment',
      )
      state.isLoading = false
      break
    case 'SET_IS_LOADING':
      state.isLoading = action.payload
      break
    case 'TOGGLE_LOADING':
      state.isLoading = !state.isLoading
      break
    case 'SET_PAGES':
      state.pages = action.payload
      break
    case 'SET_TOTAL':
      state.total = action.payload
      break
    default:
      return state
  }
  return state
}

export const ClientProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(produce(reducer), {
    clients: [],
    plans,
    isLoading: false,
    onReloadPlans: false,
    pages: 0,
    total: 0,
  })

  // useEffect(() => {
  //   getPlans().then((plans) => {
  //     dispatch({ type: 'ON_LOAD_PLANS', payload: plans })
  //   })
  // }, [state.onReloadPlans])

  return (
    <ClientContext.Provider value={[state, dispatch]}>
      {props.children}
    </ClientContext.Provider>
  )
}
