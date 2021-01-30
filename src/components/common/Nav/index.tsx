import * as React from 'react'
import { useHistory } from 'react-router-dom'

import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Menu from '@material-ui/icons/Menu'
import Grid from '@material-ui/core/Grid'

import MyDrawer from 'components/common/Drawer'
import { GlobalContext } from 'hooks/useGlobalState'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Slide from '@material-ui/core/Slide'

const Nav: React.FC = (props) => {
  const [state, dispatch] = React.useContext(GlobalContext)!
  const history = useHistory()
  const [isActive, setIsActive] = React.useState(false)

  const onToggle = (title?: string) => {
    setIsActive((isActive) => !isActive)

    if (!title) {
      return
    }
    dispatch({ type: 'setTitle', payload: title })
  }

  interface Props {
    window?: () => Window
    children: React.ReactElement
  }

  function HideOnScroll(props: Props) {
    const { children, window } = props
    const trigger = useScrollTrigger({ target: window ? window() : undefined })

    return (
      <Slide appear={false} direction='down' in={!trigger}>
        {children}
      </Slide>
    )
  }

  return (
    <HideOnScroll {...props}>
      <AppBar
        style={{
          background:
            'linear-gradient(to right, #9c27b0, #9c27b0, #9c27b0, #9c27b0, #9c27b0, #a721aa, #b119a4, #ba119e, #cb0090, #d80081, #e20672, #e91e63)',
        }}
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
                {state.title}
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  )
}

export default Nav
