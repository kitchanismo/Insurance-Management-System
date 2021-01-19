import User from 'models/user'
import { UserProps } from 'providers/contexts/userContext'
import * as React from 'react'

const useUserService = () => {
  const [user, setUser] = React.useState<User>({
    username: '',
    password: '',
    firstname: '',
    middlename: '',
    lastname: '',
    address: '',
    contact: '',
    gender: null,
    civil: null,
    birthdate: null,
    position: null,
    branch: null,
    team: null,
  })
  return { user, setUser } as UserProps
}

export default useUserService
