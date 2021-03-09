import http from 'utils/http'

export const getApiKeys = () => {
  return http.get('/settings/codes').then(({ data }) => data)
}

export const setApiKeys = ({
  apiCode,
  apiPassword,
}: {
  apiCode: string
  apiPassword: string
}) => {
  return http
    .post('/settings/codes', { apiCode, apiPassword })
    .then(({ data }) => data)
}
