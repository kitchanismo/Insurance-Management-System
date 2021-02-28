import { createContext, Dispatch, useReducer } from 'react'
import { produce } from 'immer'
import User from 'models/user'

export const UserContext = createContext<
  [state: UserState, dispatch: Dispatch<UserAction>] | null
>(null)

interface UserState {
  users: User[]
  pages: number
  total: number
  isLoading: boolean
}

export type UserAction =
  | {
      type: 'ON_LOAD_USERS'
      payload: { users: User[]; pages?: number; total?: number }
    }
  | { type: 'SET_IS_LOADING'; payload: boolean }
  | { type: 'SET_TOTAL'; payload: number }
  | { type: 'SET_PAGES'; payload: number }

const reducer = (state: UserState, action: UserAction) => {
  switch (action.type) {
    case 'ON_LOAD_USERS':
      state.users = action.payload.users
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

export const UserProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(produce(reducer), {
    users: [],
    isLoading: false,
    pages: 0,
    total: 0,
  })

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}
