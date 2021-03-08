import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { useHistory } from 'react-router-dom'
import Fab from '@material-ui/core/Fab'
import Fade from 'react-reveal/Fade'
import DashboardIcon from '@material-ui/icons/Dashboard'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import TransactionIcon from '@material-ui/icons/Payment'

export interface MyNavFooterProps {}

const MyNavFooter: React.SFC<MyNavFooterProps> = () => {
  const styles = useStyles()
  const history = useHistory()
  return (
    <AppBar position='fixed' color='primary' className={styles.appBar}>
      <Fade delay={1000} bottom>
        <Toolbar>
          <Grid
            container
            style={{ paddingLeft: 50, paddingRight: 50 }}
            xs={12}
            justify='space-between'
          >
            <IconButton
              onClick={() => history.push('/clients/new')}
              style={{ paddingBottom: 22 }}
              color='inherit'
            >
              <PersonAddIcon />
            </IconButton>
            <IconButton
              onClick={() => history.push('/transaction/encode')}
              style={{ paddingBottom: 22 }}
              color='inherit'
            >
              <TransactionIcon />
            </IconButton>
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
