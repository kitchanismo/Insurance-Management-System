import * as React from 'react'
import { useHistory } from 'react-router-dom'
import MyDrawer from 'components/common/myDrawer'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Menu from '@material-ui/icons/Menu'
import Grid from '@material-ui/core/Grid'

const Nav: React.FC = () => {
  const history = useHistory()
  const [title, setTitle] = React.useState('User Management')
  const [isActive, setIsActive] = React.useState(false)

  const onToggle = (title?: string) => {
    setIsActive((isActive) => !isActive)

    if (!title) {
      return
    }

    if (title === 'User Management') {
      history.push('/users')
    } else if (title === 'Dashboard') {
      history.push('/')
    }

    setTitle(title)
  }

  return (
    <AppBar
      style={{
        background:
          'linear-gradient(to left, #e91e63, #df0077, #d0008b, #ba119e, #9c27b0)',
      }}
      position='sticky'
    >
      <MyDrawer onToggle={onToggle} isActive={isActive}></MyDrawer>
      <Toolbar>
        <Grid container xs={12} justify='center'>
          <Grid container xs={1} sm={5} md={4} justify='flex-start'>
            <IconButton
              onClick={() => onToggle()}
              edge='start'
              color='inherit'
              aria-label='menu'
            >
              <Menu />
            </IconButton>
          </Grid>
          <Grid container xs={11} sm={5} md={4} justify='flex-end'>
            <Typography style={{ paddingTop: 8 }} variant='h6'>
              {title}
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Nav
