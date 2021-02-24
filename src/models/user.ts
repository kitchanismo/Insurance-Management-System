import Branch from 'models/branch'
interface User {
  username: string
  password: string
  role?: 'admin' | 'cashier'
  branch?: Branch
}

export default User
