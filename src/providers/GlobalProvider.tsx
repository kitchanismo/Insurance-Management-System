import { ThemeProvider } from '@material-ui/core/styles'
import * as React from 'react'
import useGlobalState, { GlobalContext } from '../hooks/useGlobalState'
import { createMuiTheme } from '@material-ui/core/styles'

export const GlobalProvider: React.FC = (props) => {
  const [state, dispatch] = useGlobalState()

  const theme = createMuiTheme({
    overrides: {
      MuiCssBaseline: {
        '@global': {
          body: {
            backgroundColor: state.isDark ? '#303030' : '#fafafa',
          },
        },
      },
    },
    typography: {
      fontFamily: ['Arial'].join(','),
    },

    palette: {
      type: state.isDark ? 'dark' : 'light',
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
        <GlobalContext.Provider value={[state, dispatch]}>
          {props.children}
        </GlobalContext.Provider>
      </ThemeProvider>
    </>
  )
}
