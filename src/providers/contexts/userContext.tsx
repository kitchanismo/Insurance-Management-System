import User from 'models/user'
import React from 'react'

export interface UserProps {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
}

const UserContext = React.createContext<any>(null)

export default UserContext
