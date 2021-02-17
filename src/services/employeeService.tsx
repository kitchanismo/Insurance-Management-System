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
  page?: number
}

export const getEmployees = async (props?: GetEmployeesProps) => {
  if (!props) {
    return http.get('/employees').then(({ data }) => data)
  }

  return http
    .get(
      `/employees?page=${props?.page || ''}&search=${
        props?.search || ''
      }&category=${props?.category || ''}`,
    )
    .then(({ data }) => {
      if (!props?.page) {
        return data
      }
      const employees: Employee[] = data.items.map((item: any) => ({
        ...item.profile,
        ...item,
      }))
      return { employees, pages: data.pages, total: data.count }
    })
}

export const getEmployee = async (id: string) => {
  return http.get('/employees/' + id).then(({ data }) => {
    //order is important
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

export const updateEmployee = (employee: Employee) => {
  return http.put('/employees/' + employee.id, employee).then(({ data }) => {
    return data
  })
}

export const archiveEmployee = (id: number) => {
  return http.delete('/employees/' + id).then(({ data }) => data)
}
