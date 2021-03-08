import MyCard from 'components/common/MyCard'
import { useContext, useEffect, useState } from 'react'
import Link from '@material-ui/core/Link'
import { useHistory, useParams } from 'react-router-dom'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import Payment from 'models/payment'
import { getPayment, getPayments } from 'services/paymentService'
import { PaymentContext } from 'providers/PaymentProvider'
import MyAvatar from 'components/common/MyAvatar'
import { GlobalContext } from 'providers/GlobalProvider'
import MyMiniCards from 'components/common/MyMiniCards'
import Commission from 'models/commission'
import MySkeletonCard from 'components/common/MySkeletonCard'
import MySkeletonMiniCards from 'components/common/MySkeletonMiniCards'

export interface PaymentViewProps {}

const PaymentView: React.SFC<PaymentViewProps> = () => {
  const history = useHistory()
  const params = useParams<{ id: string }>()
  const [payment, setPayment] = useState<Payment>({})
  const [isLoading, setIsLoading] = useState(true)

  const [globalState, globalDispatch] = useContext(GlobalContext)!

  useEffect(() => {
    globalDispatch({ type: 'SET_TITLE', payload: 'Payment Details' })
    globalDispatch({ type: 'SET_IS_LOADING', payload: true })

    getPayment(+params.id)
      .then((payment) => {
        setPayment(payment)
        globalDispatch({ type: 'SET_IS_LOADING', payload: false })
        setIsLoading(false)
      })
      .catch(() => {
        globalDispatch({ type: 'SET_IS_LOADING', payload: false })
        setIsLoading(false)
      })
    return () => {
      globalDispatch({ type: 'SET_IS_LOADING', payload: false })
      setIsLoading(false)
    }
  }, [])

  const client = payment.client
  const fullname = `${client?.profile?.lastname}, ${client?.profile?.firstname} ${client?.profile?.middlename}`

  const insured_at = new Date(payment?.client?.created_at!)
  // const hasCommission =
  //   new Date(insured_at.setFullYear(insured_at.getFullYear() + 1)) >=
  //   new Date(Date.now())

  const handleSelected = (commission: Commission) => {
    // history.push('/clients/' + client.id)
  }

  return (
    <>
      {isLoading && (
        <>
          <MySkeletonCard height={110} />
          <Grid
            container
            style={{ marginBottom: 10 }}
            xs={12}
            justify='space-between'
          >
            <Typography variant='subtitle1'>Commissioners</Typography>
            <Link component='button' variant='body1'>
              View All({payment?.commissions?.length})
            </Link>
            <MySkeletonMiniCards />
          </Grid>
        </>
      )}
      {!isLoading && (
        <>
          <MyCard
            title={'OR#' + payment.or_number}
            style={{ paddingBottom: 5, marginBottom: 10 }}
          >
            <CardContent>
              <Grid xs={12} direction='row' container>
                <Grid item xs={7}>
                  <Typography component='h3' variant='h6'>
                    {fullname}
                  </Typography>
                  <Typography variant='subtitle1' color='textSecondary'>
                    {payment.client?.branch?.name}
                  </Typography>
                  <Typography variant='subtitle1' color='textSecondary'>
                    {'₱ ' + payment.amount}
                  </Typography>
                  <Typography variant='caption' color='textSecondary'>
                    {'Paid on ' + new Date(payment?.created_at!).toDateString()}
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  xs={5}
                  justify='center'
                  alignItems='center'
                >
                  <MyAvatar src={payment?.client?.profile?.image_url} />
                </Grid>
              </Grid>
            </CardContent>
          </MyCard>

          {!!payment?.commissions?.length && (
            <>
              <Typography variant='subtitle1'>Commissioners</Typography>
              <MyMiniCards
                style={{ marginBottom: 15, marginTop: 10 }}
                onSelected={handleSelected}
                items={payment?.commissions!}
              >
                {({ renderCards, item }) => (
                  <>
                    {renderCards({
                      item,
                      title: `${item.employee?.profile?.lastname}, ${item.employee?.profile?.firstname} (${item.employee?.position?.name})`,
                      subtitle: '₱ ' + item.amount!,
                      src: item.employee?.profile?.image_url,
                    })}
                  </>
                )}
              </MyMiniCards>
            </>
          )}
        </>
      )}
      <Grid item xs={6}>
        <Button
          onClick={() => history.goBack()}
          fullWidth
          variant='contained'
          color='default'
        >
          BACK
        </Button>
      </Grid>
    </>
  )
}

export default PaymentView
