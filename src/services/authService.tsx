import User from 'models/user'
import http from 'utils/http'

export const onSignIn = ({ username, password }: User) => {
  return http
    .post('/auth/signin', { username, password })
    .then(({ data }) => data.access_token)
}
