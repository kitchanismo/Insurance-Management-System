import React from 'react'

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

const GlobalContext = React.createContext<GlobalProps | null>(null)

export default GlobalContext
