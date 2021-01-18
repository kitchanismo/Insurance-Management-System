import MyDrawer from 'components/common/myDrawer'
import * as React from 'react'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Menu from '@material-ui/icons/Menu'
import styles from './index.module.css'
import { Grid } from '@material-ui/core'

const Nav: React.FC = () => {
  const [title, setTitle] = React.useState('Users')
  const [isActive, setIsActive] = React.useState(false)

  const onToggle = (title?: string) => {
    setIsActive((isActive) => !isActive)
    if (title) {
      setTitle(title)
    }
  }

  return (
    <AppBar position='sticky'>
      <MyDrawer onToggle={onToggle} isActive={isActive}></MyDrawer>
      <Toolbar>
        <IconButton
          onClick={() => onToggle()}
          edge='start'
          color='inherit'
          aria-label='menu'
        >
          <Menu />
        </IconButton>
        <Grid container item justify='flex-end'>
          <Typography variant='h6'>{title}</Typography>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Nav
