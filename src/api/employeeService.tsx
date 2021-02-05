import Employee from 'models/employee'
import http from 'utils/http'

const employees: Employee[] = [
  {
    id: 1,
    firstname: 'Firstname',
    middlename: 'Middlename',
    lastname: 'Lastname',
    address: 'fgf',
    contact: 'fgfg',
    gender: 'Male',
    civil: 'Single',
    status: 'active',
    birthdate: new Date('10/03/1991'),
    position: 'Agency Manager',
  },
  {
    id: 2,
    firstname: 'Firstname',
    middlename: 'Middlename',
    lastname: 'Lastname',
    address: 'fgf',
    contact: 'fgfg',
    gender: 'Male',
    civil: 'Single',
    status: 'active',
    birthdate: new Date('10/03/1991'),
    position: 'Branch Manager',
  },
  {
    id: 3,
    firstname: 'Firstname',
    middlename: 'Middlename',
    lastname: 'Lastname',
    address: 'fgf',
    contact: 'fgfg',
    gender: 'Male',
    civil: 'Single',
    status: 'active',
    birthdate: new Date('10/03/1991'),
    position: 'Sales Agent',
  },

  {
    id: 4,
    firstname: 'Firstname',
    middlename: 'Middlename',
    lastname: 'Lastname',
    address: 'fgf',
    contact: 'fgfg',
    gender: 'Male',
    civil: 'Single',
    status: 'active',
    birthdate: new Date('10/03/1991'),
    position: 'Supervisor',
  },
]
export const saveEmployee = async (employee: Employee) => {
  return new Promise<Employee>(function (resolve, reject) {
    setTimeout(() => {
      console.log(employee)
      resolve(employee)
    }, 3000)
  })
}

export const getEmployees = async () => {
  return new Promise<Employee[]>(function (resolve, reject) {
    setTimeout(() => {
      resolve(employees)
    }, 3000)
  })
}

export const getEmployee = async () => {
  return new Promise<Employee>(function (resolve, reject) {
    setTimeout(() => {
      const employee: Employee = {
        id: 1,
        firstname: 'Firstname',
        middlename: 'Middlename',
        lastname: 'Lastname',
        position: 'Branch Manager',
        civil: 'Single',
        gender: 'Male',
        address: 'Somewhere ssdsdsd sdfdfdfdf sfdfdff',
        contact: '09234545866',
        status: 'active',
        birthdate: new Date('10/03/1991'),
      }
      resolve(employee)
    }, 3000)
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
