import Client from 'models/client'
import Plan from 'models/plan'

const clients: Client[] = [
  {
    id: 1,
    code: 'HEY-7634464',
    firstname: 'Firstname',
    middlename: 'Middlename',
    lastname: 'Lastname',
    payment_count: 4,
    balance: 5000,
    plan: 'Plan 1',
    payment_period: 'Quarterly',
    civil: 'Single',
    gender: 'Male',
    address: 'Somewhere ssdsdsd sdfdfdfdf sfdfdff',
    contact: '09234545866',
    branch: 1,
    payment_mode: 'Fullpayment',
    employee: 1,
    years_to_pay: 5,
    birthdate: new Date('10/03/1991'),
    created_at: new Date('09/06/2020'),
  },
  {
    id: 2,
    code: 'HEY-7634554',
    firstname: 'Firstname',
    middlename: 'Middlename',
    lastname: 'Lastname',
    payment_count: 4,
    balance: 20000,
    plan: 'Plan 1',
    payment_period: 'Monthly',
    civil: 'Single',
    gender: 'Male',
    address: 'Somewhere ssdsdsd sdfdfdfdf sfdfdff',
    contact: '09234545866',
    employee: 1,
    branch: 2,
    years_to_pay: 5,
    payment_mode: 'Installment',
    birthdate: new Date('10/03/1991'),
    created_at: new Date('09/06/2020'),
  },
  {
    id: 3,
    code: 'HEY-7654554',
    firstname: 'Firstname',
    middlename: 'Middlename',
    lastname: 'Lastname',
    payment_count: 4,
    balance: 1000,
    plan: 'Plan 3',
    payment_period: 'Monthly',
    civil: 'Single',
    gender: 'Male',
    address: 'Somewhere ssdsdsd sdfdfdfdf sfdfdff',
    contact: '09234545866',
    employee: 2,
    branch: 1,
    years_to_pay: 5,
    payment_mode: 'Installment',
    birthdate: new Date('10/03/1991'),
    created_at: new Date('09/06/2020'),
  },
]

const plans: Plan[] = [
  {
    price: 23280,
    plan: 'Plan 1',
  },
  {
    price: 32280,
    plan: 'Plan 2',
  },
  {
    price: 41280,
    plan: 'Plan 3',
  },
  {
    price: 50280,
    plan: 'Plan 4',
  },
]

export const getClient = async (clients: Client[], id: number) => {
  const client = clients.filter((client) => client.id === id)[0]
  return new Promise<Client>(function (resolve, reject) {
    setTimeout(() => {
      resolve(client)
    }, 3000)
  })
}

export const getPlans = async () => {
  return new Promise<Plan[]>(function (resolve, reject) {
    setTimeout(() => {
      resolve(plans)
    }, 1000)
  })
}

export const getClients = async () => {
  return new Promise<Client[]>(function (resolve, reject) {
    setTimeout(() => {
      resolve(clients)
    }, 3000)
  })
}

export const getAmountToPay = (client: Client, plans: Plan[]) => {
  const plan = plans.filter((plan) => plan.plan === client.plan)[0]

  if (client.payment_mode === 'Fullpayment') {
    return plan.price
  }

  switch (client.payment_period) {
    case 'Monthly':
      return plan.price / (12 * client.years_to_pay!)
    case 'Quarterly':
      return plan.price / (4 * client.years_to_pay!)
    case 'Semi-Annually':
      return plan.price / (2 * client.years_to_pay!)
      break
    case 'Annually':
      return plan.price / client.years_to_pay!
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
      period = 0
      break
  }

  return period * client.years_to_pay!
}

export const computeTotalCountPaid = (client: Client, plans: Plan[]) => {
  if (!plans.length) return '?'
  const amount = getAmountToPay(client, plans)
  const totalCountPaid = computeTotalCountToPay(client)
  return (
    totalCountPaid - Math.ceil(client.balance! / amount) + '/' + totalCountPaid
  )
}
