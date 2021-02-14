import Payment from 'models/payment'
import http from 'utils/http'

const payments: Payment[] = [
  {
    id: 1,
    client: {
      firstname: 'Firstname',
      lastname: 'Lastnane',
      middlename: 'Middlename',
    },
    amount: 388,
    or_number: '1033-233444',
    created_at: new Date(Date.now()),
    hasCommission: true,
  },
  {
    id: 2,
    client: {
      firstname: 'Firstname',
      lastname: 'Lastnane',
      middlename: 'Middlename',
    },
    amount: 388,
    or_number: '1033-235444',
    created_at: new Date(Date.now()),
    hasCommission: false,
  },
  {
    id: 3,
    client: {
      firstname: 'Firstname',
      lastname: 'Lastnane',
      middlename: 'Middlename',
    },
    amount: 388,
    or_number: '1033-233424',
    created_at: new Date(Date.now()),
    hasCommission: true,
  },
]

export const getPayments = () => {
  return new Promise<Payment[]>(function (resolve, reject) {
    setTimeout(() => {
      resolve(payments)
    }, 3000)
  })
}

export const savePayments = (payment: any) => {
  return http.post('/payments', payment).then(({ data }) => data)
}

export const getRecentCommissionerByClient = (id: number) => {
  return http.get('/commissions/client/' + id).then(({ data }) => data)
}
