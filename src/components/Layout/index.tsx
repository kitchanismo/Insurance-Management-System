import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import makeStyles from '@material-ui/core/styles/makeStyles'

import Container from '@material-ui/core/Container'
import Dashboard from 'components/Pages/Dashboard'
import Employees from 'components/Pages/Employees'
import ViewEmployee from 'components/Pages/Employees/ViewEmployee'
import NewEmployee from 'components/Pages/Employees/NewEmployee'
import EditEmployee from 'components/Pages/Employees/EditEmployee'
import Clients from 'components/Pages/Clients'
import ViewClient from 'components/Pages/Clients/ViewClient'
import NewClient from 'components/Pages/Clients/NewClient'

const Layout = () => {
  const styles = useStyles()
  return (
    <Container maxWidth='xs' className={styles.container}>
      <Switch>
        <Route path='/clients/new' component={NewClient} />
        <Route path='/clients/:id' component={ViewClient} />
        <Route path='/clients' component={Clients} />
        <Route path='/employees/new' component={NewEmployee} />
        <Route path='/employees/edit/:id' component={EditEmployee} />
        <Route
          path='/employees/:id'
          render={(props) => <ViewEmployee title='View User' {...props} />}
        />
        <Route path='/employees' component={Employees} />
        <Route path='/' component={Dashboard} />
        <Redirect from='/' exact to='/dashboard' />
        <Redirect to='/not-found' />
      </Switch>
    </Container>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 20,
    paddingTop: 75,
    height: '100%',
    backgroundColor: theme.palette.background.default,
  },
}))

export default Layout
