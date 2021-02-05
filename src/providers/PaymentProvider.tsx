import usePaymentState, {
  PaymentState,
  PaymentAction,
} from 'hooks/usePaymentState'
import { Dispatch, createContext } from 'react'

export const PaymentContext = createContext<
  [state: PaymentState, dispatch: Dispatch<PaymentAction>] | null
>(null)

export const PaymentProvider: React.FC = (props) => {
  const { state, dispatch } = usePaymentState()
  return (
    <PaymentContext.Provider value={[state, dispatch]}>
      {props.children}
    </PaymentContext.Provider>
  )
}
