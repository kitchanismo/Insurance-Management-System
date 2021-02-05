import { useContext, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import MyChips from 'components/common/MyChips'
import MySearchField from 'components/common/MySearchField'
import { PaymentContext } from 'hooks/usePaymentState'
import { getPayments } from 'api/paymentService'

export interface PaymentHistoryProps {}

const PaymentHistory: React.SFC<PaymentHistoryProps> = () => {
  const [paymentState, paymentDispatch] = useContext(PaymentContext)!

  useEffect(() => {
    getPayments().then((payments) => {
      paymentDispatch({ type: 'ON_LOAD_PAYMENTS', payload: payments })
    })
  }, [])

  const chips = ['All', 'No commission', 'With Commission']
  console.log(paymentState.payments)
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
        {/* {paymentState.payments.map((payment) => (
          <Grid key={payment.id} item xs={12}>
            {payment.or_number}
          </Grid>
        ))} */}
      </Grid>
    </>
  )
}

export default PaymentHistory
