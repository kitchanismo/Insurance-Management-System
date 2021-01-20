import User from 'models/user'
import React from 'react'

export interface UserProps {
  currentUser: Partial<User> | null
  setCurrentUser: React.Dispatch<React.SetStateAction<Partial<User> | null>>
}

const UserContext = React.createContext<UserProps | null>(null)

export default UserContext
