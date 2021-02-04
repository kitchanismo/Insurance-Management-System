import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import { getAmountToPay, getClients } from 'api/clientService'
import MyMiniCards from 'components/common/MyMiniCards'
import MySearchField from 'components/common/MySearchField'
import MyAvatar from 'components/common/MyAvatar'
import Client from 'models/client'
import { ClientContext } from 'providers/ClientProvicer'
import { useContext, useEffect, useState } from 'react'
import { capitalize } from 'utils/helper'
import CommissionersForm from './TransactionForm'
import TransactionModel from 'models/transaction'
import { GlobalContext } from 'hooks/useGlobalState'

export interface TransactionProps {}

const Transaction: React.SFC<TransactionProps> = () => {
  const [clientState, clientDispatch] = useContext(ClientContext)!

  const [_, globalDispatch] = useContext(GlobalContext)!

  const [transaction, setTransaction] = useState<TransactionModel>({
    position: 'sales_agent',
    amount: '0',
  })

  useEffect(() => {
    globalDispatch({ type: 'SET_TITLE', payload: 'ENCODE TRANSACTION' })
    getClients().then((clients) => {
      clientDispatch({ type: 'ON_LOAD_CLIENTS', payload: clients })
    })
  }, [])

  useEffect(() => {
    if (transaction.id) {
      setTransaction((transaction) => ({
        ...transaction,
        amount: '' + getAmountToPay(transaction, clientState.plans),
      }))
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
    } = transaction

    console.log({
      client: id,
      insured_employee,
      amount,
      or_number,
      branch_manager,
      agency_manager,
      supervisor,
      sales_agent,
      created_at: new Date(Date.now()).toLocaleDateString(),
    })
  }

  return (
    <Grid container direction='column' xs={12}>
      <MySearchField labelWidth={140} label='Client Name / Code' />
      <MyMiniCards
        onSelected={handleSelected}
        style={{ marginTop: 10 }}
        items={clientState.clients}
      >
        {({ renderCards, item }) => (
          <>
            {renderCards({
              title: `${item.lastname}, ${item.firstname}`,
              subtitle: item.code!,
              initials: `${capitalize(item.lastname!)}${capitalize(
                item.firstname!,
              )}`,
              item,
            })}
          </>
        )}
      </MyMiniCards>
      <Divider style={{ margin: 20 }}></Divider>
      <Grid xs={12} container justify='space-between'>
        <Grid item xs={8}>
          <Typography component='h6' variant='h6'>
            {transaction.id
              ? `${transaction?.lastname}, ${transaction?.firstname} ${transaction?.middlename}`
              : 'No Selected'}
          </Typography>
          <Typography variant='subtitle2' color='textSecondary'>
            {transaction.id ? transaction?.code : ''}
          </Typography>
          <Typography variant='subtitle2' color='textSecondary'>
            {transaction.id ? transaction?.plan : ''}
          </Typography>
          <Typography variant='subtitle2' color='textSecondary'>
            {transaction.id ? transaction?.payment_period : ''}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          {transaction.id ? (
            <MyAvatar
              text={`${capitalize(transaction?.lastname!)}${capitalize(
                transaction?.firstname!,
              )}`}
            />
          ) : null}
        </Grid>
      </Grid>

      <Divider style={{ margin: 20 }}></Divider>
      <CommissionersForm
        onSubmit={handleSubmit}
        state={[transaction, setTransaction]}
      />
    </Grid>
  )
}

export default Transaction
