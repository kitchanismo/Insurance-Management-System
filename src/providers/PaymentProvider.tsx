import { Dispatch, createContext, useReducer } from 'react'
import Payment from 'models/payment'
import { produce } from 'immer'

export const PaymentContext = createContext<
  [state: PaymentState, dispatch: Dispatch<PaymentAction>] | null
>(null)

interface PaymentState {
  payments: Payment[]
}

type PaymentAction = { type: 'ON_LOAD_PAYMENTS'; payload: Payment[] }

const paymentReducer = (state: PaymentState, action: PaymentAction) => {
  switch (action.type) {
    case 'ON_LOAD_PAYMENTS':
      state.payments = action.payload
      break
    default:
      return state
  }

  return state
}

export const PaymentProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(produce(paymentReducer), {
    payments: [],
  })
  return (
    <PaymentContext.Provider value={[state, dispatch]}>
      {props.children}
    </PaymentContext.Provider>
  )
}
