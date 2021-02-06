import { useContext, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import MyChips from 'components/common/MyChips'
import MySearchField from 'components/common/MySearchField'
import { PaymentContext } from 'providers/PaymentProvider'
import { getPayments } from 'services/paymentService'
import PaymentCard from './PaymentCard'

export interface PaymentHistoryProps {}

const PaymentHistory: React.SFC<PaymentHistoryProps> = () => {
  const [paymentState, paymentDispatch] = useContext(PaymentContext)!

  useEffect(() => {
    getPayments().then((payments) => {
      paymentDispatch({ type: 'ON_LOAD_PAYMENTS', payload: payments })
    })
  }, [])

  const chips = ['All', 'No commission', 'With Commission']

  return (
    <>
      <MySearchField style={{ marginBottom: 15 }} />
      <MyChips active='All' chips={chips}></MyChips>
      <Grid
        container
        spacing={2}
        direction='column'
        justify='flex-start'
        alignItems='center'
      >
        {paymentState.payments.map((payment) => (
          <Grid key={payment.id} item xs={12}>
            <PaymentCard payment={payment} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default PaymentHistory
