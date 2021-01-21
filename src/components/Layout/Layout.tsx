import { Dashboard } from 'components/Pages/Dashboard'
import { Users } from 'components/Pages/Users'
import { NewUser } from 'components/Pages/Users/NewUser'
import { ViewUser } from 'components/Pages/Users/ViewUser'
import { Route, Redirect, Switch } from 'react-router-dom'

export const Layout = () => {
  return (
    <Switch>
      <Route path='/users/new' component={NewUser} />
      <Route path='/users/:id' component={ViewUser} />
      <Route path='/users' component={Users} />
      <Route path='/' component={Dashboard} />
      <Redirect from='/' exact to='/dashboard' />
      <Redirect to='/not-found' />
    </Switch>
  )
}
