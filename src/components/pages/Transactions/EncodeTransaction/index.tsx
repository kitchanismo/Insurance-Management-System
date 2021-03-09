import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import {
  getAmountToPay,
  getLapsedClients,
  getClients,
} from 'services/clientService'
import MyMiniCards from 'components/common/MyMiniCards'
import MySearchField from 'components/common/MySearchField'
import MyAvatar from 'components/common/MyAvatar'
import Client from 'models/client'
import { ClientContext } from 'providers/ClientProvider'
import { useContext, useEffect, useState } from 'react'
import CommissionersForm from './TransactionForm'
import TransactionModel from 'models/transaction'
import { GlobalContext } from 'providers/GlobalProvider'
import MySkeletonMiniCards from 'components/common/MySkeletonMiniCards'
import { getEmployees } from 'services/employeeService'
import Employee from 'models/employee'
import {
  getRecentCommissionerByClient,
  savePayments,
} from 'services/paymentService'
import { getUnread } from 'services/notificationService'
import { NotificationContext } from 'providers/NotificationProvider'

export interface TransactionProps {}

const Transaction: React.SFC<TransactionProps> = () => {
  const [clientState, clientDispatch] = useContext(ClientContext)!
  const [notifState, notifDispatch] = useContext(NotificationContext)!

  const [globalState, globalDispatch] = useContext(GlobalContext)!

  const [employees, setEmployees] = useState<Employee[]>([])

  const [transaction, setTransaction] = useState<TransactionModel>({
    position: 'sales_agent',
    amount: 0,
  })

  useEffect(() => {
    clientDispatch({ type: 'SET_IS_LOADING', payload: true })
    globalDispatch({ type: 'SET_TITLE', payload: 'Encode Transaction' })
    globalDispatch({ type: 'SET_IS_LOADING', payload: true })
    getLapsedClients('').then((clients) => {
      clientDispatch({
        type: 'ON_LOAD_CLIENTS',
        payload: { clients },
      })
      globalDispatch({ type: 'SET_IS_LOADING', payload: false })
    })

    getEmployees({ category: 'active' }).then((employees) => {
      setEmployees(employees)
    })
    return () => {
      globalDispatch({ type: 'SET_IS_LOADING', payload: false })
    }
  }, [])

  useEffect(() => {
    if (transaction.id) {
      let amount: number = 0

      switch (transaction.payment_mode) {
        case 'Installment':
          amount = getAmountToPay(transaction)
          break
        case 'Fullpayment':
          amount = transaction?.balance!
          break
        default:
          break
      }
      setTransaction((transaction) => ({
        ...transaction,
        amount,
      }))

      globalDispatch({ type: 'SET_IS_LOADING', payload: true })

      getRecentCommissionerByClient(transaction.id)
        .then((employees: any) => {
          globalDispatch({ type: 'SET_IS_LOADING', payload: false })

          const getCommissioner = (id: number) =>
            employees.find((employee: any) =>
              globalState.currentUser?.role === 'admin'
                ? employee.positionId === id
                : employee.positionId === id &&
                  employee.branch?.id === globalState.currentUser?.branch?.id!
            )?.id || ''

          const branch_manager = getCommissioner(1)
          const agency_manager = getCommissioner(2)
          const supervisor = getCommissioner(3)
          const sales_agent = getCommissioner(4)

          setTransaction((transaction) => ({
            ...transaction,
            branch: employees[0]?.branch,
            branch_manager,
            agency_manager,
            supervisor,
            sales_agent,
          }))
        })
        .catch(() => globalDispatch({ type: 'SET_IS_LOADING', payload: false }))
    }
  }, [transaction.payment_mode, transaction.id])

  const handleSelected = (client: Client) => {
    setTransaction((transaction) => ({
      ...transaction,
      ...client,
    }))
  }

  const handleSubmit = async (transaction: TransactionModel) => {
    if (!transaction.id) {
      globalDispatch({
        type: 'SET_ALERT',
        payload: { message: 'Please Select a Client!', type: 'error' },
      })
      return
    }

    const insured_employee = transaction[transaction.position] ?? 0

    if (!insured_employee) {
      globalDispatch({
        type: 'SET_ALERT',
        payload: {
          message:
            'Sales Agent is not present! Please select another employee.',
          type: 'error',
        },
      })

      return
    }

    const {
      id,
      amount,
      or_number,
      branch_manager,
      agency_manager,
      supervisor,
      sales_agent,
      created_at,
    } = transaction

    const payment = {
      client: id,
      insured_employee,
      amount,
      or_number,
      branch_manager,
      agency_manager,
      supervisor,
      sales_agent,
      created_at,
    }

    return savePayments(payment)
      .then((data) => {
        globalDispatch({
          type: 'SET_ALERT',
          payload: {
            message: 'Successfully save!',
            type: 'success',
          },
        })
        setTransaction({
          position: 'sales_agent',
          amount: 0,
        })

        getUnread().then((data) => {
          notifDispatch({ type: 'ON_LOAD_UNREAD', payload: data.count })
        })
      })
      .catch((error) => {
        if (error.response.status === 400) {
          globalDispatch({
            type: 'SET_ALERT',
            payload: {
              message: error.response.data.error,
              type: 'error',
            },
          })
          return
        }
        globalDispatch({
          type: 'SET_ALERT',
          payload: {
            message: error.message,
            type: 'error',
          },
        })
        getUnread().then((data) => {
          notifDispatch({ type: 'ON_LOAD_UNREAD', payload: data.count })
        })
      })
  }

  const onSearch = (search: string) => {
    globalDispatch({ type: 'SET_IS_LOADING', payload: true })
    getLapsedClients(search).then((clients) => {
      clientDispatch({
        type: 'ON_LOAD_CLIENTS',
        payload: { clients },
      })
      globalDispatch({ type: 'SET_IS_LOADING', payload: false })
      setTransaction({
        position: 'sales_agent',
        amount: 0,
      })
    })
  }

  const isLoading = clientState.isLoading && !clientState.clients.length

  return (
    <Grid container direction='column' xs={12}>
      <MySearchField onSearch={onSearch} labelWidth={100} label='Name / Code' />
      {isLoading && <MySkeletonMiniCards></MySkeletonMiniCards>}

      {!isLoading && (
        <MyMiniCards
          onSelected={handleSelected}
          style={{ marginTop: 10 }}
          items={clientState.clients}
        >
          {({ renderCards, item }) => (
            <>
              {renderCards({
                title: `${item?.lastname}, ${item?.firstname} ${item?.middlename}`,
                subtitle: item.code!,
                src: item.image_url,
                item,
              })}
            </>
          )}
        </MyMiniCards>
      )}
      <Divider style={{ margin: 20 }}></Divider>
      {!transaction.id && (
        <Grid container xs={12} justify='center'>
          <Typography component='h6' variant='h6'>
            No Selected Client
          </Typography>
        </Grid>
      )}
      {transaction.id && (
        <Grid
          style={{ paddingLeft: 10, paddingRight: 20 }}
          xs={12}
          container
          justify='space-between'
        >
          <Grid item xs={8}>
            <Typography component='h6' variant='h6'>
              {`${transaction?.lastname}, ${transaction?.firstname} ${transaction?.middlename}`}
            </Typography>
            <Typography variant='subtitle2' color='textSecondary'>
              {transaction?.code}
            </Typography>
            <Typography variant='subtitle2' color='textSecondary'>
              {transaction?.plan?.name! + ' - ' + transaction?.payment_period}
            </Typography>
            <Typography variant='caption' color='textSecondary'>
              {'Lapse on ' +
                new Date(transaction?.next_payment!).toDateString()}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <MyAvatar src={transaction.image_url} />
          </Grid>
        </Grid>
      )}

      <Divider style={{ margin: 20 }}></Divider>

      {!isLoading && transaction.id && (
        <CommissionersForm
          employees={employees}
          onSubmit={handleSubmit}
          state={[transaction, setTransaction]}
        />
      )}
    </Grid>
  )
}

export default Transaction
