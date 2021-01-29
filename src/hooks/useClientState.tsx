import { ClientProps } from '../contexts/clientContext'

import { useEffect, useState } from 'react'
import Client from 'models/client'

const clients: Client[] = [
  {
    id: 1,
    code: 'HEY-7634464',
    firstname: 'Fidfdfdfdfdfdfdfr',
    middlename: 'Mie',
    lastname: 'Lase',
    payment_count: 4,
    balance: 30000,
    plan: 'Plan 2',
    payment_period: 'Quarterly',
    civil: 'Single',
    gender: 'Male',
    address: 'Somewhere ssdsdsd sdfdfdfdf sfdfdff',
    contact: '09234545866',
    branch: 'Somewhere',
    payment_mode: 'Installment',
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
    payment_mode: 'Installment',
    birthdate: new Date('10/03/1991'),
    end_date: new Date('09/06/2025'),
  },
]

const useClientState = () => {
  const [clients, setClients] = useState<Client[]>([])

  useEffect(() => {
    setClients(clients)
  }, [])

  return {
    clients,
  } as ClientProps
}

export default useClientState
