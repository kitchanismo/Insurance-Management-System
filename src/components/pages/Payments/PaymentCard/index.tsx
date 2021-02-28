import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import MyCard from 'components/common/MyCard'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import Payment from 'models/payment'
import { useHistory } from 'react-router-dom'
import MyAvatar from 'components/common/MyAvatar'
import { toMoney } from 'utils/helper'

export interface PaymentCardProps {
  payment: Payment
}

const PaymentCard: React.SFC<PaymentCardProps> = ({ payment }) => {
  const history = useHistory()

  const client = payment.client

  const fullname = `${client?.profile?.lastname}, ${client?.profile?.firstname} ${client?.profile?.middlename}`
  return (
    <MyCard title={'OR#' + payment.or_number} style={{ paddingBottom: 5 }}>
      <CardContent>
        <Grid
          style={{ marginBottom: 20 }}
          xs={12}
          justify='space-between'
          container
        >
          <Grid
            style={{ paddingLeft: 10 }}
            container
            item
            direction='column'
            xs={7}
            justify='flex-start'
          >
            <Typography component='h3' variant='h6'>
              {fullname}
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
              {payment.client?.code}
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
              {payment.client?.branch?.name}
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
              {toMoney(payment?.amount!)}
            </Typography>
            {/* <Typography variant='caption' color='textSecondary'>
              {'Paid on ' + new Date(payment.created_at!).toDateString()}
            </Typography> */}
          </Grid>
          <Grid container item xs={5} justify='center' alignItems='center'>
            <MyAvatar
              src={payment?.client?.profile?.image_url}
              onClick={() => history.push('/payments/' + payment.id)}
            />
          </Grid>
        </Grid>
        <Divider style={{ marginLeft: 20, marginRight: 20 }}></Divider>
        <Grid
          style={{ paddingLeft: 15, paddingRight: 15, paddingTop: 20 }}
          container
          xs={12}
          justify='space-evenly'
        >
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <Button
              onClick={() => history.push('/payments/' + payment.id)}
              fullWidth
              variant='text'
              color='primary'
            >
              Commissioners
            </Button>
          </Grid>

          <Grid item xs={3}></Grid>
        </Grid>
      </CardContent>
    </MyCard>
  )
}

export default PaymentCard
