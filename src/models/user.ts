import Branch from 'models/branch'
interface User {
  id?: number
  username: string
  firstname?: string
  middlename?: string
  lastname?: string
  password: string
  new_password?: string
  role?: 'admin' | 'cashier'
  branch?: Branch
  image_url?: string
  image?: Blob
}

export default User
