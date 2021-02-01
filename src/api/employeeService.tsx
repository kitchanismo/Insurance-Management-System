import Employee from 'models/employee'

const employees: Employee[] = [
  {
    id: 1,
    firstname: 'Firstname',
    middlename: 'Middlename',
    lastname: 'Lastname',
    position: 'Agency Manager',
    status: 'deactive',
  },
  {
    id: 2,
    firstname: 'Firstname',
    middlename: 'Middlename',
    lastname: 'Lastname',
    position: 'Sales Agent',
    status: 'active',
  },
  {
    id: 3,
    firstname: 'Firstname',
    middlename: 'Middlename',
    lastname: 'Lastname',
    position: 'Branch Manager',
    status: 'deceased',
  },

  {
    id: 4,
    firstname: 'Firstname',
    middlename: 'Middlename',
    lastname: 'Lastname',
    position: 'Supervisor',
    status: 'active',
  },
]

export const getEmployees = async () => {
  return new Promise<Employee[]>(function (resolve, reject) {
    setTimeout(() => {
      resolve(employees)
    }, 3000)
  })
}
