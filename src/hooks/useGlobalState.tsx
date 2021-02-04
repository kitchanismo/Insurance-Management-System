import { useReducer, Dispatch, createContext } from 'react'

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
      return { ...state, alert: action.payload }
    case 'HIDE_ALERT':
      return { ...state, alert: null }
    case 'SET_TITLE':
      return { ...state, title: action.payload }
    case 'SET_IS_LOADING':
      return { ...state, isLoading: action.payload }
    case 'TOGGLE_THEME':
      return { ...state, isDark: !state.isDark }
    case 'SET_IS_AUTHENTIC_USER':
      return { ...state, isAuthenticUser: action.payload }
    default:
      return state
  }
}

const useGlobalState = () => {
  const reducer = useReducer(globalReducer, {
    alert: null,
    title: '',
    isDark: false,
    isLoading: false,
    isAuthenticUser: true,
  })

  return reducer
}

export default useGlobalState
