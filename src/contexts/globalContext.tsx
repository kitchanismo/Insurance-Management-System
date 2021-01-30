import React from 'react'
import { GlobalAction, GlobalState } from 'apihooks/useGlobalState'

export interface AlertProps {
  message: string
  type: 'success' | 'info' | 'warning' | 'error' | undefined
}

export interface GlobalProps {
  isDark: boolean
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>
  alert: AlertProps | null
  setAlert: React.Dispatch<React.SetStateAction<AlertProps | null>>
  title: string
  setTitle: React.Dispatch<React.SetStateAction<string>>
}

const GlobalContext = React.createContext<
  [state: GlobalState, dispatch: React.Dispatch<GlobalAction>] | null
>(null)

export default GlobalContext
