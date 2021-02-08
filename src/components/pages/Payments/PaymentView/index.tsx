import MyCard from 'components/common/MyCard'
import { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import Payment from 'models/payment'
import { getPayments } from 'services/paymentService'
import { PaymentContext } from 'providers/PaymentProvider'

export interface PaymentViewProps {}

const PaymentView: React.SFC<PaymentViewProps> = () => {
  const history = useHistory()
  const params = useParams<{ id: string }>()
  const [payment, setPayment] = useState<Payment>({})

  const [paymentState, paymentDispatch] = useContext(PaymentContext)!

  useEffect(() => {
    getPayments().then((payments) => {
      paymentDispatch({ type: 'ON_LOAD_PAYMENTS', payload: payments })
      const payment = payments.filter((payment) => payment.id === +params.id)[0]
      setPayment(payment)
    })
  }, [])

  const client = payment.client
  const fullname = `${client?.lastname}, ${client?.firstname} ${client?.middlename}`

  return (
    <MyCard title={payment.or_number} style={{ paddingBottom: 5 }}>
      <CardContent>
        <Grid xs={12} direction='column' container>
          <Typography component='h3' variant='h6'>
            {fullname}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            {'Php ' + payment.amount}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            {payment.created_at?.toDateString()}
          </Typography>
          <Grid item xs={6}>
            <Chip
              style={{ marginTop: 5 }}
              size='small'
              label={
                payment.hasCommission ? 'with commission' : 'no commission'
              }
              variant='default'
              color={payment.hasCommission ? 'secondary' : 'default'}
            />
          </Grid>
        </Grid>
        <Divider
          style={{
            marginTop: 20,
            marginLeft: 10,
            marginRight: 10,
          }}
        ></Divider>
        <Typography variant='subtitle1' color='textSecondary'>
          {payment.created_at?.toDateString()}
        </Typography>
      </CardContent>
    </MyCard>
  )
}

export default PaymentView
