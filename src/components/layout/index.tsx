import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import makeStyles from '@material-ui/core/styles/makeStyles'

import Container from '@material-ui/core/Container'
import Dashboard from 'components/pages/Dashboard'
import Employees from 'components/pages/Employees'
import ViewEmployee from 'components/pages/Employees/ViewEmployee'
import NewEmployee from 'components/pages/Employees/NewEmployee'
import EditEmployee from 'components/pages/Employees/EditEmployee'
import Clients from 'components/pages/Clients'
import ViewClient from 'components/pages/Clients/ViewClient'
import NewClient from 'components/pages/Clients/NewClient'
import SignIn from 'components/pages/Auth/SignIn'
import AuthRoute from 'components/common/MyAuthRoute'
import GuestRoute from 'components/common/MyGuestRoute'
import Transaction from 'components/pages/Transactions/EncodeTransaction'
import Settings from 'components/pages/Settings'
import EditClient from 'components/pages/Clients/EditClient'
import PaymentHistory from 'components/pages/Payments'
import PaymentView from 'components/pages/Payments/PaymentView'
import Branches from 'components/pages/Branches'
import NewBranch from 'components/pages/Branches/NewBranch'
import EditBranch from 'components/pages/Branches/EditBranch'
import Commissions from 'components/pages/Commissions'
import ReleaseTransaction from 'components/pages/Transactions/ReleaseTransaction'
import NotFound from 'components/common/NotFound'
import Users from 'components/pages/Users'
import NewUser from 'components/pages/Users/NewUser'

const Layout = () => {
  const styles = useStyles()

  return (
    <Container maxWidth='xs' className={styles.container}>
      <Switch>
        <AuthRoute isAdmin path='/users/new' component={NewUser} />
        <AuthRoute isAdmin path='/users' component={Users} />
        <AuthRoute path='/commissions' component={Commissions} />
        <AuthRoute
          path='/transaction/releases'
          component={ReleaseTransaction}
        />
        <AuthRoute path='/transaction/encode' component={Transaction} />
        <AuthRoute isAdmin path='/branches/new' component={NewBranch} />
        <AuthRoute isAdmin path='/branches/edit/:id' component={EditBranch} />
        <AuthRoute isAdmin path='/branches' component={Branches} />

        <AuthRoute isAdmin path='/payments/:id' component={PaymentView} />
        <AuthRoute isAdmin path='/payments' component={PaymentHistory} />

        <AuthRoute path='/settings' component={Settings} />

        <AuthRoute path='/clients/new' component={NewClient} />
        <AuthRoute isAdmin path='/clients/edit/:id' component={EditClient} />
        <AuthRoute isAdmin path='/clients/:id' component={ViewClient} />
        <AuthRoute isAdmin path='/clients' component={Clients} />

        <AuthRoute path='/employees/new' component={NewEmployee} />
        <AuthRoute
          isAdmin
          path='/employees/edit/:id'
          component={EditEmployee}
        />
        <AuthRoute isAdmin path='/employees/:id' component={ViewEmployee} />
        <AuthRoute isAdmin path='/employees' component={Employees} />

        <AuthRoute path='/dashboard' component={Dashboard} />
        <GuestRoute path='/signin' component={SignIn} />
        <Route path='/not-found' component={NotFound} />
        <Redirect from='/' exact to='/dashboard' />
        <Redirect to='/not-found' />
      </Switch>
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 20,
    paddingTop: 80,
    height: '100%',
    backgroundColor: theme.palette.background.default,
  },
}))

export default Layout
