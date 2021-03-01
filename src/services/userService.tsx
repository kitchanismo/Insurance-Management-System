import User from 'models/user'
import http from 'utils/http'

export const getUsers = ({
  page,
  search,
}: {
  page?: number
  search?: string
}) => {
  return http
    .get(`/users?page=${page || ''}&search=${search || ''}`)
    .then(({ data }) => ({
      users: data.items,
      pages: data.pages,
      total: data.count,
    }))
}

export const getUser = (id: number) => {
  return http
    .get('/users/' + id)
    .then(({ data }) => ({ ...data, branch: data.branch?.id }))
}

export const saveUser = (user: User) => {
  return http.post('/users', user).then(({ data }) => data)
}

export const updateUser = (user: User) => {
  return http.put('/users/' + user.id, user).then(({ data }) => data)
}

export const updateAccount = (user: User) => {
  return http.put('/users/account/' + user.id, user).then(({ data }) => data)
}

export const archiveUser = (id: number) => {
  return http.delete('/users/' + id).then(({ data }) => data)
}

export const getMe = () => {
  return http.get('/users/me').then(({ data }) => data)
}
