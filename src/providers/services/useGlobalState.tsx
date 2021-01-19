import { GlobalProps, AlertProps } from '../contexts/globalContext'
import { createMuiTheme } from '@material-ui/core/styles'
import { useState } from 'react'

const useGlobalState = () => {
  const [alert, setAlert] = useState<AlertProps | null>(null)
  const [isDark, setIsDark] = useState(false)

  const theme = createMuiTheme({
    overrides: {
      MuiCssBaseline: {
        '@global': {
          body: {
            backgroundColor: isDark ? '#303030' : '#fafafa',
          },
        },
      },
    },
    typography: {
      fontFamily: ['Arial'].join(','),
    },

    palette: {
      type: isDark ? 'dark' : 'light',
      primary: {
        main: '#9C27B0',
      },
      secondary: {
        main: '#E91E63',
      },
    },
  })
  return { theme, isDark, setIsDark, alert, setAlert } as GlobalProps
}

export default useGlobalState
