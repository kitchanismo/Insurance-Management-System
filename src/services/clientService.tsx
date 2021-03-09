import Branch from 'models/branch'
import Client from 'models/client'
import Commissioner from 'models/commissioner'
import Payment from 'models/payment'
import Plan from 'models/plan'
import Profile from 'models/profile'
import http from 'utils/http'

export const plans: Plan[] = [
  {
    id: 1,
    price: 23280,
    name: 'Plan 1',
  },
  {
    id: 2,
    price: 32280,
    name: 'Plan 2',
  },
  {
    id: 3,
    price: 41280,
    name: 'Plan 3',
  },
  {
    id: 4,
    price: 50280,
    name: 'Plan 4',
  },
  {
    id: 5,
    price: 65280,
    name: 'Plan 5',
  },
  {
    id: 6,
    price: 83280,
    name: 'Plan 6',
  },
  {
    id: 7,
    price: 95280,
    name: 'Plan 7',
  },
  {
    id: 8,
    price: 173280,
    name: 'Plan 8',
  },
]

export const getClient = async (id: number) => {
  return http.get('/clients/' + id).then(({ data }) => data)
}

export const getPlans = async () => {
  return new Promise<Plan[]>(function (resolve, reject) {
    resolve(plans)
  })
}

export interface ClientProps {
  search?: string
  category?: string
  page?: number
}

export const saveClient = (transaction: any) => {
  return http.post('/clients', transaction).then(({ data }) => {
    return data
  })
}

export const updateClient = (profile: Profile) => {
  return http.put('/clients/' + profile.id, profile).then(({ data }) => {
    return data
  })
}

export const getClients = async (props: ClientProps) => {
  return http
    .get(
      `/clients?page=${props.page || ''}&search=${
        props.search || ''
      }&category=${props.category || ''}`
    )
    .then(({ data }) => {
      const clients: Client[] = data.items.map((item: any) => ({
        ...item.profile,
        ...item,
      }))
      return { clients, pages: data.pages, total: data.count }
    })
}

export const getLapsedClients = async (search: string) => {
  return http.get(`/clients/lapse?search=` + search).then(({ data }) =>
    data.map((client: any) => ({
      ...client.profile,
      ...client,
    }))
  )
}

export const getAmountToPay = (client: Client) => {
  if (client.payment_mode === 'Fullpayment') {
    return client.plan?.price!
  }

  switch (client.payment_period) {
    case 'Monthly':
      return client.plan?.price! / (12 * client.years_to_pay!)
    case 'Quarterly':
      return client.plan?.price! / (4 * client.years_to_pay!)
    case 'Semi-Annually':
      return client.plan?.price! / (2 * client.years_to_pay!)
    case 'Annually':
      return client.plan?.price! / client.years_to_pay!
    default:
      return 0
  }
}

export const computeTotalCountToPay = (client: Client) => {
  let period: number = 0

  switch (client.payment_period) {
    case 'Monthly':
      period = 12
      break
    case 'Quarterly':
      period = 4
      break
    case 'Semi-Annually':
      period = 2
      break
    case 'Annually':
      period = 1
      break
    default:
      period = 12
      break
  }

  return period * client.years_to_pay!
}

export const hasCommission = (client: Client) => {
  const price = client?.plan?.price!
  const balance = client?.balance!
  const percentage = Math.ceil(((price - balance) * 100) / price)
  return percentage <= 20
}

export const computeTotalCountPaid = (client: Client) => {
  const amount = getAmountToPay(client)

  const totalCountPaid = computeTotalCountToPay(client)
  return (
    Math.ceil(totalCountPaid - client.balance! / amount) + '/' + totalCountPaid
  )
}

export const archiveClient = (id: number) => {
  return http.delete('/clients/' + id).then(({ data }) => data)
}
