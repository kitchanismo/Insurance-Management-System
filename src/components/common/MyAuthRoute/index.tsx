import { GlobalContext } from 'providers/GlobalProvider'

import React, { useContext } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

const AuthRoute: React.FC<RouteProps> = ({
  path,
  component: Component,
  render,
  ...rest
}) => {
  const [state] = useContext(GlobalContext)!
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!state.isAuthenticUser)
          return (
            <Redirect
              to={{
                pathname: '/signin',
                state: { from: props.location },
              }}
            />
          )
        return Component ? <Component {...props} /> : render?.(props)
      }}
    />
  )
}

export default AuthRoute
