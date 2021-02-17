import { createContext, Dispatch, useReducer } from 'react'
import { produce } from 'immer'
import Commission from 'models/commission'

export const CommissionContext = createContext<
  [state: CommissionState, dispatch: Dispatch<CommissionAction>] | null
>(null)

interface CommissionState {
  commissions: Commission[]
  isLoading: boolean
  total: number
  pages: number
}

export type CommissionAction =
  | {
      type: 'ON_LOAD_COMMISSIONS'
      payload: { commissions: Commission[]; total?: number; pages?: number }
    }
  | { type: 'SET_IS_LOADING'; payload: boolean }
  | { type: 'SET_TOTAL'; payload: number }
  | { type: 'SET_PAGES'; payload: number }

const reducer = (state: CommissionState, action: CommissionAction) => {
  switch (action.type) {
    case 'ON_LOAD_COMMISSIONS':
      state.commissions = action.payload.commissions
      state.total = action.payload.total!
      state.pages = action.payload.pages!
      state.isLoading = false
      break
    case 'SET_IS_LOADING':
      state.isLoading = action.payload
      break
    case 'SET_TOTAL':
      state.total = action.payload
      break
    case 'SET_PAGES':
      state.pages = action.payload
      break
    default:
      return state
  }
  return state
}

export const CommissionProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(produce(reducer), {
    commissions: [],
    isLoading: false,
    total: 0,
    pages: 0,
  })

  return (
    <CommissionContext.Provider value={[state, dispatch]}>
      {props.children}
    </CommissionContext.Provider>
  )
}
