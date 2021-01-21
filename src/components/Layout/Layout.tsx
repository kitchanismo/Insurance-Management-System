import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import makeStyles from '@material-ui/core/styles/makeStyles'

import Container from '@material-ui/core/Container'
import { Dashboard } from 'components/Pages/Dashboard'
import { Users } from 'components/Pages/Users'
import { ViewUser } from 'components/Pages/Users/ViewUser'
import { NewUser } from 'components/Pages/Users/NewUser'
import { EditUser } from 'components/Pages/Users/EditUser'

export const Layout = () => {
  const styles = useStyles()
  return (
    <Container maxWidth='xs' className={styles.container}>
      <Switch>
        <Route path='/users/new' component={NewUser} />
        <Route path='/users/edit/:id' component={EditUser} />
        <Route path='/users/:id' component={ViewUser} />
        <Route path='/users' component={Users} />
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
    height: '100%',
    backgroundColor: theme.palette.background.default,
  },
}))
