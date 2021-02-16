import Employee from 'models/employee'

interface Commission {
  id?: number
  amount?: number
  is_release?: boolean
  created_at?: Date
  employee?: Employee
}

export default Commission
