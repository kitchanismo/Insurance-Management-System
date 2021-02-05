import Payment from 'models/payment'
import { createContext, Dispatch, useReducer } from 'react'
import { produce } from 'immer'

export interface PaymentState {
  payments: Payment[]
}

export type PaymentAction = { type: 'ON_LOAD_PAYMENTS'; payload: Payment[] }

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
  const [state, dispatch] = useReducer(produce(paymentReducer), {
    payments: [],
  })
  return { state, dispatch }
}

export default usePaymentState
