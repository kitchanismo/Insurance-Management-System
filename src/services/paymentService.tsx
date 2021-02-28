import Payment from 'models/payment'
import http from 'utils/http'

export const getPayments = (props?: {
  page?: number
  search?: string
  category?: string
}) => {
  return http
    .get(
      `/payments?page=${props?.page || ''}&search=${
        props?.search || ''
      }&category=${props?.category || ''}`
    )
    .then(({ data }) => ({
      total: data.count,
      pages: data.pages,
      payments: data.items.map((item: any) => ({
        ...item,
        payment: { id: item.payment_id },
        client: { ...item.client.profile, ...item.client },
      })),
    }))
}

export const getPayment = (id: number) => {
  return http.get('/payments/' + id).then(({ data }) => data)
}

export const savePayments = (payment: any) => {
  return http.post('/payments', payment).then(({ data }) => data)
}

export const getRecentCommissionerByClient = (id: number) => {
  return http.get('/commissions/client/' + id).then(({ data }) => data)
}
