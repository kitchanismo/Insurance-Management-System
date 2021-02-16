import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import MyCard from 'components/common/MyCard'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import Payment from 'models/payment'
import { useHistory } from 'react-router-dom'

export interface PaymentCardProps {
  payment: Payment
}

const PaymentCard: React.SFC<PaymentCardProps> = ({ payment }) => {
  const history = useHistory()

  const client = payment.client
  const insured_at = new Date(payment?.client?.created_at!)
  const hasCommission =
    new Date(insured_at.setFullYear(insured_at.getFullYear() + 1)) >=
    new Date(Date.now())

  const fullname = `${client?.lastname}, ${client?.firstname} ${client?.middlename}`
  return (
    <MyCard title={payment.or_number} style={{ paddingBottom: 5 }}>
      <CardContent>
        <Grid xs={12} direction='column' container>
          <Typography component='h3' variant='h6'>
            {fullname}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            {payment.client?.code}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            {'₱ ' + payment.amount}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            {'Paid on ' + new Date(payment.created_at!).toDateString()}
          </Typography>
          <Grid item xs={6}>
            <Chip
              style={{ marginTop: 5 }}
              size='small'
              label={hasCommission ? 'with commission' : 'no commission'}
              variant='default'
              color={hasCommission ? 'secondary' : 'default'}
            />
          </Grid>
          <Grid style={{ marginTop: 20 }} item container xs={12}>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Button
                style={{ padding: 10 }}
                onClick={() => history.push('/payments/' + payment.id)}
                variant='contained'
                fullWidth
                color='default'
              >
                Details
              </Button>
            </Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </Grid>
      </CardContent>
    </MyCard>
  )
}

export default PaymentCard
