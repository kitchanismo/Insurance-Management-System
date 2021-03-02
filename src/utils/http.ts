import axios, { AxiosError } from 'axios'
import { apiUrlProd, apiUrlDev, apiUrlMobile } from 'configs/index.json'
import createAuthRefreshInterceptor from 'axios-auth-refresh'

//intercept requests
axios.interceptors.request.use((config) => {
  config.baseURL =
    process.env.NODE_ENV === 'development' ? apiUrlDev : apiUrlProd

  const access_token = localStorage.getItem('access_token')

  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`
  }
  config.withCredentials = true

  return config
})

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (
      error.message === 'Network Error' ||
      error.message === 'Internal Server Error'
    ) {
      throw Error(error.message)
    }

    throw error
  }
)

createAuthRefreshInterceptor(
  axios,
  (failedRequest) => {
    return axios
      .get('/auth/refresh-token')
      .then(({ data }) => {
        localStorage.setItem('access_token', data.access_token)
        return Promise.resolve()
      })
      .catch((error) => {
        if (error.response.status === 406) {
          localStorage.removeItem('access_token')
          window.location.href = '/signin'
        }
        console.log(error.response)
      })
  },
  {
    statusCodes: [403],
    // pauseInstanceWhileRefreshing: true,
  }
)

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  axios: axios.create(),
}
