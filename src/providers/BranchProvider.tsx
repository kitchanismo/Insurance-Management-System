import { createContext, Dispatch, useReducer } from 'react'
import { produce } from 'immer'
import Branch from 'models/branch'

export const BranchContext = createContext<
  [state: BranchState, dispatch: Dispatch<BranchAction>] | null
>(null)

interface BranchState {
  branches: Branch[]
  isLoading: boolean
}

export type BranchAction =
  | {
      type: 'ON_LOAD_BRANCHES'
      payload: Branch[]
    }
  | { type: 'SET_IS_LOADING'; payload: boolean }

const reducer = (state: BranchState, action: BranchAction) => {
  switch (action.type) {
    case 'ON_LOAD_BRANCHES':
      state.branches = action.payload
      state.isLoading = false
      break
    case 'SET_IS_LOADING':
      state.isLoading = action.payload
      break
    default:
      return state
  }
  return state
}

export const BranchProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(produce(reducer), {
    branches: [],
    isLoading: false,
  })

  return (
    <BranchContext.Provider value={[state, dispatch]}>
      {props.children}
    </BranchContext.Provider>
  )
}
