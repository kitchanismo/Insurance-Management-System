import { ThemeProvider } from '@material-ui/core/styles'
import * as React from 'react'
import GlobalContext from './contexts/globalContext'
import UserContext from './contexts/userContext'
import useGlobalState from './services/useGlobalState'
import useUserService from './services/useUserService'

const Provider: React.FC = (props) => {
  const useGlobal = useGlobalState()
  const userService = useUserService()

  return (
    <>
      <GlobalContext.Provider value={{ ...useGlobal }}>
        <ThemeProvider theme={useGlobal.theme}>
          <UserContext.Provider value={{ ...userService }}>
            {props.children}
          </UserContext.Provider>
        </ThemeProvider>
      </GlobalContext.Provider>
    </>
  )
}

export default Provider
