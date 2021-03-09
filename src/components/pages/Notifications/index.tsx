import { GlobalContext } from 'providers/GlobalProvider'
import { NotificationContext } from 'providers/NotificationProvider'
import { useContext, useEffect } from 'react'
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  send,
} from 'services/notificationService'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import NotificationCard from './NotificationCard'
import Notification from 'models/notification'

export interface NotificationsProps {}

const Notifications: React.SFC<NotificationsProps> = () => {
  const [globalState, globalDispatch] = useContext(GlobalContext)!
  const [notifState, notifDispatch] = useContext(NotificationContext)!
  useEffect(() => {
    globalDispatch({ type: 'SET_TITLE', payload: 'Notifications' })

    onLoad()
  }, [])

  const onLoad = () => {
    getNotifications().then((notifications) => {
      notifDispatch({ type: 'ON_LOAD_NOTIFICATIONS', payload: notifications })
    })
  }

  const handleRead = (notification: Notification) => {
    markAsRead(notification).then(() => {
      onLoad()
    })
  }

  const handleMarkAllAsRead = () => {
    markAllAsRead().then(() => onLoad())
  }

  const handleResend = async (notification: Notification) => {
    return send(notification)
      .then(({ message }) => {
        globalDispatch({
          type: 'SET_ALERT',
          payload: { message, type: 'success' },
        })
        onLoad()
        return true
      })
      .catch((error) => {
        globalDispatch({
          type: 'SET_ALERT',
          payload: { message: error.response.data.message, type: 'error' },
        })
        return false
      })
  }

  return notifState.notifications?.length > 0 ? (
    <>
      <Grid item xs={12} justify='center' container>
        <Button
          onClick={handleMarkAllAsRead}
          disabled={!notifState.notifications.filter((n) => !n.is_read).length}
          variant='text'
          color='primary'
        >
          Mark ALL AS READ
        </Button>
      </Grid>
      {notifState.notifications.map((notif) => (
        <NotificationCard
          onRead={handleRead}
          onResend={handleResend}
          notification={notif}
        ></NotificationCard>
      ))}
    </>
  ) : (
    <Grid container xs={12} justify='center'>
      <Typography component='h6' variant='h6'>
        No New Notification
      </Typography>
    </Grid>
  )
}

export default Notifications
