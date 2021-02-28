import React, { useState } from 'react'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import EmployeesIcon from '@material-ui/icons/People'
import UsersIcon from '@material-ui/icons/Accessibility'
import BranchIcon from '@material-ui/icons/Business'
import ClientIcon from '@material-ui/icons/SupervisedUserCircle'
import PaymentIcon from '@material-ui/icons/Receipt'
import CommissionIcon from '@material-ui/icons/Description'
import SettingsIcon from '@material-ui/icons/Settings'
import TransactionIcon from '@material-ui/icons/Payment'
import ReleaseIcon from '@material-ui/icons/MonetizationOn'
import ExitIcon from '@material-ui/icons/ExitToApp'
import ListItem from '@material-ui/core/ListItem'
import makeStyles from '@material-ui/core/styles/makeStyles'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import IconButton from '@material-ui/core/IconButton'
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'
import Grid from '@material-ui/core/Grid/Grid'
import DashboardIcon from '@material-ui/icons/Dashboard'
import { GlobalContext } from 'providers/GlobalProvider'
import { useHistory } from 'react-router-dom'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import MyAlertDialog, { AlertDataProps } from '../MyAlertDialog'
import { onSignout } from 'services/authService'

export interface MyDrawerProps {
  isActive: boolean
  onToggle: Function
}

interface SubMenuProps {
  name: string
  path: string
  icon: JSX.Element
}

interface MenuProps {
  state: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  name: string
  subMenus: SubMenuProps[]
}

const MyDrawer: React.FC<MyDrawerProps> = (props) => {
  const styles = useStyles()

  const history = useHistory()

  const [state, dispatch] = React.useContext(GlobalContext)!

  const stateManagementOpen = useState(false)
  const stateTransactionOpen = useState(false)
  const stateHistoryOpen = useState(false)
  const stateSettingOpen = useState(false)

  const adminMenus: MenuProps[] = [
    {
      state: stateTransactionOpen,
      name: 'Transaction',
      subMenus: [
        {
          name: 'Encode Transaction',
          path: '/transaction/encode',
          icon: <TransactionIcon />,
        },
        {
          name: 'Release Transaction',
          path: '/transaction/releases',
          icon: <ReleaseIcon />,
        },
      ],
    },
    {
      state: stateManagementOpen,
      name: 'Management',
      subMenus: [
        {
          name: 'Branch Management',
          path: '/branches',
          icon: <BranchIcon />,
        },
        { name: 'Client Management', path: '/clients', icon: <ClientIcon /> },

        {
          name: 'Employee Management',
          path: '/employees',
          icon: <EmployeesIcon />,
        },
        {
          name: 'User Management',
          path: '/users',
          icon: <UsersIcon />,
        },
      ],
    },

    {
      state: stateHistoryOpen,
      name: 'History',
      subMenus: [
        {
          name: 'Payment History',
          path: '/payments',
          icon: <PaymentIcon />,
        },
        {
          name: 'Commission History',
          path: '/commissions',
          icon: <CommissionIcon />,
        },
      ],
    },
    {
      state: stateSettingOpen,
      name: 'Settings',
      subMenus: [
        {
          name: 'General Settings',
          path: '/settings',
          icon: <SettingsIcon />,
        },
      ],
    },
  ]

  const cashierMenus = [
    {
      name: 'Client Registration',
      path: '/clients/new',
      icon: <BranchIcon />,
    },
    {
      name: 'Employee Registration',
      path: '/employees/new',
      icon: <EmployeesIcon />,
    },
    {
      name: 'Encode Transaction',
      path: '/transaction/encode',
      icon: <TransactionIcon />,
    },
    {
      name: 'General Settings',
      path: '/settings',
      icon: <SettingsIcon />,
    },
  ]

  const renderSubMenus = (subMenu: {
    name: string
    path: string
    icon: JSX.Element
  }) => {
    return (
      <List component='div' disablePadding>
        <ListItem
          onClick={() => {
            props.onToggle(subMenu.name)
            history.replace(subMenu.path)
          }}
          button
          className={styles.nested}
        >
          <ListItemIcon style={{ paddingLeft: 20 }}>
            {subMenu.icon}
          </ListItemIcon>
          <ListItemText primary={subMenu.name} />
        </ListItem>
      </List>
    )
  }

  const renderMenus = ({ state: [open, setOpen], ...rest }: MenuProps) => {
    return (
      <>
        <ListItem
          style={{ paddingLeft: 30 }}
          button
          onClick={() => setOpen(!open)}
        >
          <ListItemText primary={rest.name} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout='auto' unmountOnExit>
          {rest.subMenus.map((subMenu) => renderSubMenus(subMenu))}
        </Collapse>
      </>
    )
  }

  const [alertDialog, setAlertDialog] = useState<AlertDataProps>({})

  const handleArchieve = () => {
    props.onToggle()
    setAlertDialog({
      open: false,
    })
    onSignout()
      .then(() => {
        localStorage.removeItem('access_token')
        dispatch({ type: 'SET_CURRENT_USER', payload: null })
      })
      .catch(() => {
        localStorage.removeItem('access_token')
        dispatch({ type: 'SET_CURRENT_USER', payload: null })
      })
  }

  return (
    <Drawer
      anchor='left'
      open={props.isActive}
      ModalProps={{ onBackdropClick: () => props.onToggle() }}
    >
      <MyAlertDialog
        onAgree={handleArchieve}
        onDisagree={() => setAlertDialog({ open: false })}
        data={alertDialog}
      />
      <Grid container justify='flex-end'>
        <IconButton
          onClick={() => props.onToggle()}
          edge='start'
          color='inherit'
          aria-label='menu'
        >
          <ChevronLeftIcon />
        </IconButton>
      </Grid>
      <List
        className={styles.root}
        component='nav'
        aria-labelledby='nested-list-subheader'
      >
        {state.currentUser?.role === 'admin' &&
          adminMenus.map((menu) => renderMenus(menu))}
        {state.currentUser?.role === 'cashier' &&
          cashierMenus.map((menu) => renderSubMenus(menu))}
        <Divider
          style={{
            marginTop: 10,
            marginLeft: 10,
            marginRight: 10,
          }}
        ></Divider>
        <ListItem style={{ paddingLeft: 30 }} button>
          <ListItemText
            className={styles.logout}
            primary='Logout'
            onClick={() => {
              setAlertDialog({
                text: 'Are you sure do you want to logout?',
                open: true,
              })
            }}
          />
        </ListItem>
      </List>
    </Drawer>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: 270,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(2),
  },
  close: {
    paddingTop: 5,
    paddingRight: 5,
  },
  logout: {
    marginTop: 10,
    color: theme.palette.secondary.main,
  },
}))

export default MyDrawer
