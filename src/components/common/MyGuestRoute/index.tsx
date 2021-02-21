import { GlobalContext } from 'providers/GlobalProvider'

import React, { useContext } from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { getCurrentUser } from 'utils/helper'

const AuthRoute: React.FC<RouteProps & { isAdmin?: boolean }> = ({
  path,
  component: Component,
  render,
  isAdmin = false,
  ...rest
}) => {
  const [state] = useContext(GlobalContext)!

  return (
    <Route
      {...rest}
      render={(props) => {
        if (getCurrentUser())
          return (
            <Redirect
              to={{
                pathname: '/',
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
