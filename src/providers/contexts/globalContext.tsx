import { Theme } from '@material-ui/core/styles'
import React from 'react'

export interface AlertProps {
  message: string
  type: 'success' | 'info' | 'warning' | 'error' | undefined
}

export interface GlobalProps {
  theme: Theme
  isDark: boolean
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>
  alert: AlertProps | null
  setAlert: React.Dispatch<React.SetStateAction<AlertProps | null>>
}

const GlobalContext = React.createContext<GlobalProps | null>(null)

export default GlobalContext
