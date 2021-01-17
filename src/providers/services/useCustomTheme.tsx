import { GlobalProps } from './../contexts/globalContext'
import { createMuiTheme } from '@material-ui/core/styles'
import { ComponentProps, useState } from 'react'

const useCustomTheme = () => {
  const [isDark, setIsDark] = useState(true)

  const theme = createMuiTheme({
    typography: {
      fontFamily: ['Arial'].join(','),
    },

    palette: {
      type: isDark ? 'dark' : 'light',
      primary: {
        main: '#e91e63',
      },
      secondary: {
        main: '#ffc400',
      },
    },
  })
  return { theme, isDark, setIsDark } as GlobalProps
}

export default useCustomTheme
