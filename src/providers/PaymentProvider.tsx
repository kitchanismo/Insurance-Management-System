import { Dispatch, createContext, useReducer } from 'react'
import Payment from 'models/payment'
import { produce } from 'immer'

export const PaymentContext = createContext<
  [state: PaymentState, dispatch: Dispatch<PaymentAction>] | null
>(null)

interface PaymentState {
  payments: Payment[]
  total: number
  pages: number
  isLoading: boolean
}

type PaymentAction =
  | {
      type: 'ON_LOAD_PAYMENTS'
      payload: { payments: Payment[]; total?: number; pages?: number }
    }
  | { type: 'SET_IS_LOADING'; payload: boolean }
  | { type: 'SET_TOTAL'; payload: number }
  | { type: 'SET_PAGES'; payload: number }

const reducer = (state: PaymentState, action: PaymentAction) => {
  switch (action.type) {
    case 'ON_LOAD_PAYMENTS':
      state.payments = action.payload.payments
      state.total = action.payload.total!
      state.pages = action.payload.pages!
      state.isLoading = false
      break
    case 'SET_TOTAL':
      state.total = action.payload
      break
    case 'SET_PAGES':
      state.pages = action.payload
      break
    case 'SET_IS_LOADING':
      state.isLoading = action.payload
      break
    default:
      return state
  }

  return state
}

export const PaymentProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(produce(reducer), {
    payments: [],
    total: 0,
    pages: 0,
    isLoading: false,
  })
  return (
    <PaymentContext.Provider value={[state, dispatch]}>
      {props.children}
    </PaymentContext.Provider>
  )
}
