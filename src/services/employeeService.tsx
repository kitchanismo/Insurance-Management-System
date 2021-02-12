import Employee from 'models/employee'
import http from 'utils/http'

export const saveEmployee = async (employee: Employee) => {
  return http.post('/employees', employee).then((result) => {
    return employee
  })
}

export interface GetEmployeesProps {
  search?: string
  category?: string
  page: number
}

export const getEmployees = async (props: GetEmployeesProps) => {
  return http
    .get(
      `/employees?page=${props.page}&search=${props.search || ''}&category=${
        props.category || ''
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

export const getEmployee = async (id: string) => {
  return http.get('/employees/' + id).then(({ data }) => {
    const employee: Employee = {
      id: data.id,
      ...data.profile,
      branch: data.branch.id,
      position: data.position.id,
      status: data.status,
      clients: data.clients,
    }
    return employee
  })
}

export const postImage = async (image: Blob) => {
  const formData = new FormData()

  formData.append('file', image!)
  formData.append('upload_preset', 'wlttlc0c')
  formData.append('cloud_name', 'kitchanismo')
  return http.axios.post(
    'https://api.cloudinary.com/v1_1/kitchanismo/image/upload',
    formData,
  )
}
