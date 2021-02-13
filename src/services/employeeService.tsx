import Employee from 'models/employee'
import http from 'utils/http'

export const saveEmployee = async (employee: Employee) => {
  return http.post('/employees', employee).then(({ data }) => {
    return data
  })
}

export interface GetEmployeesProps {
  search?: string
  category?: string
  page: number
}

export const getEmployees = async (props?: GetEmployeesProps) => {
  if (!props) {
    return http.get('/employees').then(({ data }) => data)
  }

  return http
    .get(
      `/employees?page=${props?.page}&search=${props?.search || ''}&category=${
        props?.category || ''
      }`,
    )
    .then(({ data }) => {
      const employees: Employee[] = data.items.map((item: any) => ({
        ...item.profile,
        ...item,
      }))
      return { employees, pages: data.pages, total: data.count }
    })
}

export const getBranches = async () => {
  return http.get('/branches').then(({ data }) => data)
}

export const getEmployeesByBranch = (id: number) => {
  return http.get(`/branches/${id}/employees`).then(({ data }) => data)
}

export const getEmployee = async (id: string) => {
  return http.get('/employees/' + id).then(({ data }) => {
    const employee: Employee = {
      ...data.profile,
      id: data.id,
      branch: data.branch.id,
      position: data.position.id,
      status: data.status,
      clients: data.clients.map((client: any) => ({
        ...client.profile,
        ...client,
      })),
    }
    return employee
  })
}
