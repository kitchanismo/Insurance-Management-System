import { useReducer, Dispatch, createContext } from 'react'
import { produce } from 'immer'

export interface AlertProps {
  message: string
  type: 'success' | 'info' | 'warning' | 'error' | undefined
}

export const GlobalContext = createContext<
  [state: GlobalState, dispatch: Dispatch<GlobalAction>] | null
>(null)

export interface GlobalState {
  alert: AlertProps | null
  title: string
  isDark: boolean
  isLoading: boolean
  isAuthenticUser: boolean
}

export type GlobalAction =
  | { type: 'HIDE_ALERT' | 'TOGGLE_THEME' }
  | { type: 'SET_ALERT'; payload: AlertProps | null }
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_IS_LOADING'; payload: boolean }
  | { type: 'SET_IS_AUTHENTIC_USER'; payload: boolean }

const globalReducer = (state: GlobalState, action: GlobalAction) => {
  switch (action.type) {
    case 'SET_ALERT':
      state.alert = action.payload
      break
    case 'HIDE_ALERT':
      state.alert = null
      break
    case 'SET_TITLE':
      state.title = action.payload
      break
    case 'SET_IS_LOADING':
      state.isLoading = action.payload
      break
    case 'TOGGLE_THEME':
      state.isDark = !state.isDark
      break
    case 'SET_IS_AUTHENTIC_USER':
      state.isAuthenticUser = action.payload
      break
    default:
      return state
  }
  return state
}

const useGlobalState = () => {
  const reducer = useReducer(produce(globalReducer), {
    alert: null,
    title: '',
    isDark: false,
    isLoading: false,
    isAuthenticUser: true,
  })

  return reducer
}

export default useGlobalState
