import { ThemeProvider } from '@material-ui/core/styles'
import { createContext, Dispatch, useEffect, useReducer } from 'react'
import { createMuiTheme } from '@material-ui/core/styles'
import { produce } from 'immer'
import { getCurrentUser } from 'utils/helper'
import User from 'models/user'

export const GlobalContext = createContext<
  [state: GlobalState, dispatch: Dispatch<GlobalAction>] | null
>(null)

export interface AlertProps {
  message: string
  type: 'success' | 'info' | 'warning' | 'error' | undefined
}

interface GlobalState {
  alert: AlertProps | null
  title: string
  isDark: boolean
  isLoading: boolean
  currentUser: User | null
}

type GlobalAction =
  | { type: 'HIDE_ALERT' | 'TOGGLE_THEME' }
  | { type: 'SET_ALERT'; payload: AlertProps | null }
  | { type: 'SET_TITLE'; payload: string }
  | { type: 'SET_IS_LOADING'; payload: boolean }
  | { type: 'SET_CURRENT_USER'; payload: User | null }

const reducer = (state: GlobalState, action: GlobalAction) => {
  switch (action.type) {
    case 'SET_ALERT':
      state.alert = action.payload
      break
    case 'HIDE_ALERT':
      state.alert = null
      break
    case 'SET_TITLE':
      state.title = action.payload
      break
    case 'SET_IS_LOADING':
      state.isLoading = action.payload
      break
    case 'TOGGLE_THEME':
      state.isDark = !state.isDark
      break
    case 'SET_CURRENT_USER':
      state.currentUser = action.payload
      break
    default:
      return state
  }
  return state
}

const GlobalProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(produce(reducer), {
    alert: null,
    title: 'PSY INSURANCE',
    isDark: false,
    isLoading: false,
    currentUser: null,
  })

  useEffect(() => {
    dispatch({ type: 'SET_CURRENT_USER', payload: getCurrentUser() })
  }, [])

  const theme = createMuiTheme({
    overrides: {
      MuiButton: {
        root: {
          borderRadius: 30,
          paddingTop: 15,
          paddingBottom: 15,
        },
      },
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

export default GlobalProvider
