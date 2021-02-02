import axios, { AxiosError } from 'axios'
import { apiUrlProd, apiUrlDev } from 'configs/index.json'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

//intercept requests
axios.interceptors.request.use((config) => {
  config.baseURL =
    process.env.NODE_ENV === 'development' ? apiUrlDev : apiUrlProd

  config.withCredentials = true
  return config
})

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.message === 'Network Error') {
      throw Error(error.message)
    }

    throw error
  },
)

createAuthRefreshInterceptor(
  axios,
  (failedRequest) => {
    return axios.get('/auth/refresh-token').then(({ data }) => {
      return Promise.resolve()
    })
  },
  {
    statusCodes: [403],
    pauseInstanceWhileRefreshing: true,
  },
)

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  axios: axios.create(),
}
