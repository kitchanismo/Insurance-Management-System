import User from 'models/user'
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

  const currentUser: User | null = getCurrentUser()

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!currentUser)
          return (
            <Redirect
              to={{
                pathname: '/signin',
                state: { from: props.location },
              }}
            />
          )

        if (isAdmin && currentUser?.role !== 'admin')
          return (
            <Redirect
              to={{
                pathname: '/not-found',
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
