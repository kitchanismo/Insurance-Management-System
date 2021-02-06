interface User {
  username: string
  password: string
  role?: 'admin' | 'cashier'
}

export default User
