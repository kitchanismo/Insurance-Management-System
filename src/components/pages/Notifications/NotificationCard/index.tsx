import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Divider from '@material-ui/core/Divider'
import MyCard from 'components/common/MyCard'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import { useHistory } from 'react-router-dom'
import { useContext, useState } from 'react'

import Notification from 'models/notification'
import MyAvatar from 'components/common/MyAvatar'
import { GlobalContext } from 'providers/GlobalProvider'

export interface NotificationCardProps {
  notification: Notification
  onResend?: (notification: Notification) => Promise<boolean>
  onRead?: (notification: Notification) => void
}

const NotificationCard: React.SFC<NotificationCardProps> = ({
  notification,
  onResend,
  onRead,
}) => {
  const history = useHistory()
  const [globalState, globalDispatch] = useContext(GlobalContext)!
  const profile = notification?.client?.profile
  const client = notification?.client

  const [isLoading, setIsLoading] = useState(false)

  const next_payment = new Date(client?.next_payment!).toDateString()

  const title =
    notification?.type === 'lapse'
      ? 'Lapsed on ' + next_payment
      : 'Near on ' + next_payment

  const handleResend = async () => {
    setIsLoading(true)
    await onResend?.(notification)
    setIsLoading(false)
  }

  return (
    <MyCard style={{ marginTop: 20 }} title={title}>
      <CardContent>
        <Grid container xs={12} justify='space-between'>
          <Grid
            style={{ paddingLeft: 10 }}
            container
            item
            direction='column'
            xs={7}
            justify='flex-start'
          >
            <Typography component='h6' variant='h6'>
              {`${profile?.lastname}, ${profile?.firstname} ${profile?.middlename}`}
            </Typography>

            <Typography variant='subtitle1' color='textSecondary'>
              {`${client?.code}`}
            </Typography>

            <Grid item xs={1}>
              <Chip
                style={{ marginTop: 10 }}
                size='small'
                label={notification?.is_sent ? 'notified' : 'unnotified'}
                variant='outlined'
                color={!notification?.is_sent ? 'secondary' : 'primary'}
              />
            </Grid>
          </Grid>
          <Grid container item xs={5} justify='center' alignItems='center'>
            <MyAvatar
              src={profile?.image_url}
              onClick={() => history.push('/clients/' + client?.id)}
            />
          </Grid>
        </Grid>
        <Divider
          style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}
        ></Divider>

        <Grid
          style={{ padding: 15, paddingBottom: 0 }}
          container
          xs={12}
          justify='space-evenly'
        >
          <Grid item xs={6}>
            <Button
              disabled={isLoading}
              onClick={handleResend}
              fullWidth
              variant='text'
              color='primary'
              startIcon={
                isLoading && (
                  <CircularProgress
                    color='primary'
                    size={24}
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: -12,
                      marginLeft: -12,
                    }}
                  />
                )
              }
            >
              Resend
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              disabled={notification?.is_read}
              onClick={() => onRead?.(notification)}
              fullWidth
              variant='text'
              color='primary'
            >
              Mark As Read
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </MyCard>
  )
}

export default NotificationCard
