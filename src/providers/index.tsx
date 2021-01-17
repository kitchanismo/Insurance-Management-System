import { ThemeProvider } from '@material-ui/core/styles'
import * as React from 'react'
import GlobalContext from './contexts/globalContext'
import useCustomTheme from './services/useCustomTheme'

const Provider: React.FC = (props) => {
  const { theme, isDark, setIsDark } = useCustomTheme()

  return (
    <>
      <GlobalContext.Provider value={{ isDark, setIsDark, theme }}>
        <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
      </GlobalContext.Provider>
    </>
  )
}

export default Provider
