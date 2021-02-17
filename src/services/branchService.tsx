import Branch from 'models/branch'
import http from 'utils/http'

export const getBranches = (search?: string) => {
  return http.get(`/branches?search=${search || ''}`).then(({ data }) => data)
}

export const saveBranch = (branch: Branch) => {
  return http.post('/branches', branch).then(({ data }) => data)
}

export const getEmployeesByBranch = (id: number) => {
  return http.get(`/branches/${id}/employees`).then(({ data }) => data)
}

export const getBranch = (id: number) => {
  return http.get('/branches/' + id).then(({ data }) => data)
}

export const updateBranch = (branch: Branch) => {
  return http.put('/branches/' + branch.id, branch).then(({ data }) => data)
}

export const archiveBranch = (id: number) => {
  return http.delete('/branches/' + id).then(({ data }) => data)
}
