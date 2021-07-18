import React, { useContext, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { useHistory } from 'react-router-dom'
import Fab from '@material-ui/core/Fab'
import Fade from 'react-reveal/Fade'
import DashboardIcon from '@material-ui/icons/Dashboard'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import Grid from '@material-ui/core/Grid'
import NotificationIcon from '@material-ui/icons/Notifications'
import TransactionIcon from '@material-ui/icons/Payment'
import EmployeesIcon from '@material-ui/icons/People'
import FaceIcon from '@material-ui/icons/Face'
import ClientIcon from '@material-ui/icons/SupervisedUserCircle'
import { NotificationContext } from 'providers/NotificationProvider'
import { getUnread } from 'services/notificationService'
import { GlobalContext } from 'providers/GlobalProvider'

export interface MyNavFooterProps {}

const MyNavFooter: React.SFC<MyNavFooterProps> = () => {
  const styles = useStyles()
  const history = useHistory()
  const [globalState, _] = useContext(GlobalContext)!
  const [{ unread }, dispatch] = useContext(NotificationContext)!

  return (
    <AppBar position='fixed' color='primary' className={styles.appBar}>
      <Fade delay={1000} bottom>
        <Toolbar>
          <Grid
            container
            // style={{ paddingLeft: 50, paddingRight: 50 }}
            xs={12}
            justify='space-around'
          >
            <IconButton
              onClick={() => history.push('/clients/new')}
              style={{ paddingBottom: 22 }}
              color='inherit'
            >
              <ClientIcon />
            </IconButton>

            <IconButton
              onClick={() => history.push('/employees/new')}
              style={{ paddingBottom: 22 }}
              color='inherit'
            >
              <EmployeesIcon />
            </IconButton>

            <Grid item xs={2}></Grid>

            <IconButton
              onClick={() => history.push('/transaction/encode')}
              style={{ paddingBottom: 22 }}
              color='inherit'
            >
              <TransactionIcon />
            </IconButton>

            {globalState?.currentUser?.role === 'admin' && (
              <IconButton
                onClick={() => history.push('/notifications')}
                style={{ paddingBottom: 22 }}
                color='inherit'
              >
                <Badge
                  invisible={unread <= 0}
                  badgeContent={unread}
                  max={99}
                  color='secondary'
                >
                  <NotificationIcon />
                </Badge>
              </IconButton>
            )}
            {globalState?.currentUser?.role !== 'admin' && (
              <IconButton
                onClick={() => history.push('/settings/account')}
                style={{ paddingBottom: 22 }}
                color='inherit'
              >
                <FaceIcon />
              </IconButton>
            )}
          </Grid>
          <Fab
            onClick={() => history.replace('/')}
            color='secondary'
            aria-label='add'
            className={styles.fabButton}
          >
            <DashboardIcon />
          </Fab>
        </Toolbar>
      </Fade>
    </AppBar>
  )
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: 'auto',
    bottom: -10,
    background:
      'linear-gradient(to left, #9c27b0, #9c27b0, #9c27b0, #9c27b0, #9c27b0, #a721aa, #b119a4, #ba119e, #cb0090, #d80081, #e20672, #e91e63)',
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -20,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
}))

export default MyNavFooter
