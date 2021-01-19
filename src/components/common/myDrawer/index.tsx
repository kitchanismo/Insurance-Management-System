import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ArrowBack from '@material-ui/icons/ArrowBack'
import ListItem from '@material-ui/core/ListItem'
import makeStyles from '@material-ui/core/styles/makeStyles'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import * as React from 'react'
import Grid from '@material-ui/core/Grid/Grid'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import GlobalContext, { GlobalProps } from 'providers/contexts/globalContext'

export interface MyDrawerProps {
  isActive: boolean
  onToggle: Function
}

const MyDrawer: React.FC<MyDrawerProps> = (props) => {
  const styles = useStyles()
  const { isDark, setIsDark } = React.useContext<GlobalProps>(GlobalContext)
  const menus = ['Menu1', 'Menu2', 'Menu3', 'Menu4']

  const list = () => (
    <>
      <List>
        {menus.map((menu, index) => (
          <ListItem button key={index}>
            <ListItemText primary={menu} onClick={() => props.onToggle(menu)} />
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

      <FormControlLabel
        style={{ marginLeft: 10 }}
        control={
          <Switch
            checked={isDark}
            onChange={() => setIsDark(!isDark)}
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
