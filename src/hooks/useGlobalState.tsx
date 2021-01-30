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
}

export type GlobalAction =
  | { type: 'hideAlert' | 'toggleTheme' }
  | { type: 'setAlert'; payload: AlertProps | null }
  | { type: 'setTitle'; payload: string }
  | { type: 'setIsLoading'; payload: boolean }

const globalReducer = (state: GlobalState, action: GlobalAction) => {
  switch (action.type) {
    case 'setAlert':
      return { ...state, alert: action.payload }
    case 'hideAlert':
      return { ...state, alert: null }
    case 'setTitle':
      return { ...state, title: action.payload }
    case 'setIsLoading':
      return { ...state, isLoading: action.payload }
    case 'toggleTheme':
      return { ...state, isDark: !state.isDark }
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
  })

  return reducer
}

export default useGlobalState
