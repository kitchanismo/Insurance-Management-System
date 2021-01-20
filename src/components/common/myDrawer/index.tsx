import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ArrowBack from '@material-ui/icons/ArrowBack'
import UsersIcon from '@material-ui/icons/People'
import ListItem from '@material-ui/core/ListItem'
import makeStyles from '@material-ui/core/styles/makeStyles'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import * as React from 'react'
import Grid from '@material-ui/core/Grid/Grid'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import GlobalContext from 'providers/contexts/globalContext'
import DashboardIcon from '@material-ui/icons/Dashboard'

export interface MyDrawerProps {
  isActive: boolean
  onToggle: Function
}

const MyDrawer: React.FC<MyDrawerProps> = (props) => {
  const styles = useStyles()

  const ctx = React.useContext(GlobalContext)

  const menus = [
    { name: 'Dashboard', icon: <DashboardIcon /> },
    { name: 'User Management', icon: <UsersIcon /> },
  ]

  const list = () => (
    <>
      <List>
        {menus.map((menu, index) => (
          <ListItem style={{ paddingLeft: 0 }} button key={index}>
            <ListItemIcon style={{ paddingLeft: 20 }}>{menu.icon}</ListItemIcon>

            <ListItemText
              primary={menu.name}
              onClick={() => props.onToggle(menu.name)}
            />
          </ListItem>
        ))}
      </List>
    </>
  )

  return (
    <Drawer anchor='left' open={props.isActive}>
      <Grid container justify='flex-end'>
        <IconButton
          onClick={() => props.onToggle()}
          edge='start'
          color='inherit'
          aria-label='menu'
        >
          <ArrowBack />
        </IconButton>
      </Grid>
      {list()}
      <Divider style={{ marginLeft: 10, marginRight: 10 }}></Divider>
      <FormControlLabel
        style={{ marginLeft: 10, marginTop: 10 }}
        control={
          <Switch
            checked={ctx?.isDark}
            onChange={() => ctx?.setIsDark((isDark) => !isDark)}
            name='checkedA'
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        }
        label='Dark Mode'
      />
    </Drawer>
  )
}

const useStyles = makeStyles((theme) => ({
  close: {
    paddingTop: 5,
    paddingRight: 5,
  },
}))

export default MyDrawer
