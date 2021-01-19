import User from 'models/user'
import React from 'react'

export interface UserProps {
  currentUser: User | null
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
}

const UserContext = React.createContext<any>(null)

export default UserContext
