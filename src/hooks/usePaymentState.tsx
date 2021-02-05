import Payment from 'models/payment'
import { createContext, Dispatch, useReducer } from 'react'
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

const usePaymentState = () => {
  const reducer = useReducer(produce(paymentReducer), {
    payments: [],
  })
  return reducer
}

export default usePaymentState
