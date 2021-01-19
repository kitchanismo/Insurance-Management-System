import User from 'models/user'
import { UserProps } from 'providers/contexts/userContext'
import * as React from 'react'

const useUserService = () => {
  const [currentUser, setCurrentUser] = React.useState<User | null>(null)
  return { currentUser, setCurrentUser } as UserProps
}

export default useUserService
