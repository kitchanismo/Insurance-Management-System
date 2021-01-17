import { Theme } from '@material-ui/core/styles'
import React from 'react'

export interface GlobalProps {
  theme: Theme
  isDark: boolean
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>
}

const GlobalContext = React.createContext<any>(null)

export default GlobalContext
