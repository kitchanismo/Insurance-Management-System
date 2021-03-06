import http from 'utils/http'

export const getClientStats = (range: string, branchId?: number) => {
  return http
    .get(`/statistics/clients?range=${range || ''}&branchId=${branchId || ''}`)
    .then(({ data }) => data)
}

export const getSalesStats = (range: string, branchId?: number) => {
  return http
    .get(`/statistics/sales?range=${range || ''}&branchId=${branchId || ''}`)
    .then(({ data }) => data)
}

export const getStatistics = () => {
  return http.get(`/statistics`).then(({ data }) => data)
}
