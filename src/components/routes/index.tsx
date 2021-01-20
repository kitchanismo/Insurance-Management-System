import Dashboard from 'components/pages/dashboard'
import Users from 'components/pages/users'
import NewUser from 'components/pages/users/new'
import ViewUser from 'components/pages/users/view'
import { Route, Redirect, Switch } from 'react-router-dom'

const Routes = () => {
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

export default Routes
