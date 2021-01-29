import { ThemeProvider } from '@material-ui/core/styles'
import * as React from 'react'
import GlobalContext from '../contexts/globalContext'
import useGlobalState from '../apihooks/useGlobalState'
import { createMuiTheme } from '@material-ui/core/styles'

export const GlobalProvider: React.FC = (props) => {
  const useGlobal = useGlobalState()

  const theme = createMuiTheme({
    overrides: {
      MuiCssBaseline: {
        '@global': {
          body: {
            backgroundColor: useGlobal.isDark ? '#303030' : '#fafafa',
          },
        },
      },
    },
    typography: {
      fontFamily: ['Arial'].join(','),
    },

    palette: {
      type: useGlobal.isDark ? 'dark' : 'light',
      primary: {
        main: '#9C27B0',
      },
      secondary: {
        main: '#E91E63',
      },
    },
  })

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalContext.Provider value={{ ...useGlobal }}>
          {props.children}
        </GlobalContext.Provider>
      </ThemeProvider>
    </>
  )
}
