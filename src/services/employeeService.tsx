import Branch from 'models/branch'
import Employee from 'models/employee'
import Position from 'models/position'
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
    status: 'deactive',
    branch: 1,
    birthdate: new Date('10/03/1991'),
    position: 2,
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
    branch: 1,
    birthdate: new Date('10/03/1991'),
    position: 1,
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
    branch: 2,
    birthdate: new Date('10/03/1991'),
    position: 1,
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
    status: 'deceased',
    branch: 2,
    birthdate: new Date('10/03/1991'),
    position: 3,
  },
]

const branches: Branch[] = [
  { name: 'SM Manila', id: 1 },
  { name: 'SM Bacolod', id: 2 },
]

const positions: Position[] = [
  { id: 1, name: 'Branch Manager' },
  { id: 2, name: 'Agency Manager' },
  { id: 3, name: 'Supervisor' },
  { id: 4, name: 'Sales Agent' },
]
export const saveEmployee = async (employee: Employee) => {
  return http.post('/employees', employee).then((result) => {
    console.log(result)
    return employee
  })
}

export const getEmployees = async () => {
  return new Promise<Employee[]>(function (resolve, reject) {
    setTimeout(() => {
      resolve(employees)
    }, 3000)
  })
}

export const getBranches = async () => {
  return new Promise<Branch[]>(function (resolve, reject) {
    setTimeout(() => {
      resolve(branches)
    }, 4000)
  })
}

export const getPositions = async () => {
  return new Promise<Position[]>(function (resolve, reject) {
    setTimeout(() => {
      resolve(positions)
    }, 4000)
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
        position: 1,
        civil: 'Single',
        gender: 'Male',
        branch: 1,
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
