import Employee from 'models/employee'
import Client from 'models/client'
interface Commissioner {
  branch_manager?: string
  agency_manager?: string
  supervisor?: string
  sales_agent?: string
  position: 'branch_manager' | 'agency_manager' | 'supervisor' | 'sales_agent'
}

export default Commissioner
