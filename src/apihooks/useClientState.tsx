import { ClientProps } from '../contexts/clientContext'
import { useEffect, useRef, useState } from 'react'
import Client from 'models/client'

const plans = [
  {
    price: 23280,
    plan: 'Plan 1',
    monthly: 388,
    quarterly: 1164,
    semiAnnually: 2328,
    annually: 4656,
  },
  {
    price: 32280,
    plan: 'Plan 2',
    monthly: 538,
    quarterly: 1614,
    semiAnnually: 3228,
    annually: 6456,
  },
  {
    price: 41280,
    plan: 'Plan 3',
    monthly: 688,
    quarterly: 2064,
    semiAnnually: 4128,
    annually: 8256,
  },
]

const useClientState = () => {
  const [clients, setClients] = useState<Client[]>([])

  const onLoadClients = () => {
    const clients: Client[] = [
      {
        id: 1,
        code: 'HEY-7634464',
        firstname: 'Fidfdfdfdfdfdfdfr',
        middlename: 'Mie',
        lastname: 'Lase',
        payment_count: 4,
        balance: 15000,
        plan: 'Plan 2',
        payment_period: 'Quarterly',
        civil: 'Single',
        gender: 'Male',
        address: 'Somewhere ssdsdsd sdfdfdfdf sfdfdff',
        contact: '09234545866',
        branch: 'Somewhere',
        payment_mode: 'Installment',
        years_to_pay: 5,
        birthdate: new Date('10/03/1991'),
        end_date: new Date('09/06/2025'),
      },
      {
        id: 2,
        code: 'HEY-7634554',
        firstname: 'Fidfdfdfdfdfdfdfr',
        middlename: 'Mie',
        lastname: 'Lase',
        payment_count: 4,
        balance: 20000,
        plan: 'Plan 1',
        payment_period: 'Monthly',
        civil: 'Single',
        gender: 'Male',
        address: 'Somewhere ssdsdsd sdfdfdfdf sfdfdff',
        contact: '09234545866',
        branch: 'Somewhere',
        years_to_pay: 5,
        payment_mode: 'Installment',
        birthdate: new Date('10/03/1991'),
        end_date: new Date('09/06/2025'),
      },
      {
        id: 3,
        code: 'HEY-7654554',
        firstname: 'Fidfdfdfdfdfdfdfr',
        middlename: 'Mie',
        lastname: 'Lase',
        payment_count: 4,
        balance: 0,
        plan: 'Plan 3',
        payment_period: 'Monthly',
        civil: 'Single',
        gender: 'Male',
        address: 'Somewhere ssdsdsd sdfdfdfdf sfdfdff',
        contact: '09234545866',
        branch: 'Somewhere',
        years_to_pay: 5,
        payment_mode: 'Installment',
        birthdate: new Date('10/03/1991'),
        end_date: new Date('09/06/2025'),
      },
    ]
    setClients(clients)
    console.log('hit clients')
  }

  const computeTotalPay = (client: Client) => {
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
      case null:
        period = 0
        break
      default:
        period = 0
        break
    }

    return period * (client.years_to_pay || 0)
  }

  const computeTotalPaid = (client: Client) => {
    const plan = plans.filter((plan) => plan.plan === client.plan)[0]

    let downpayment = 0

    switch (client.payment_period) {
      case 'Monthly':
        downpayment = plan.monthly
        break
      case 'Quarterly':
        downpayment = plan.quarterly
        break
      case 'Semi-Annually':
        downpayment = plan.semiAnnually
        break
      case 'Annually':
        downpayment = plan.annually
        break
      default:
        downpayment = 0
        break
    }

    return (
      computeTotalPay(client) - Math.ceil((client.balance || 0) / downpayment)
    )
  }

  return {
    clients,
    computeTotalPay,
    computeTotalPaid,
    onLoadClients,
  } as ClientProps
}

export default useClientState
