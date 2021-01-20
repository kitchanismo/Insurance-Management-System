import Users from 'components/pages/users'
import NewUser from 'components/pages/users/new'
import { Route, Redirect, Switch } from 'react-router-dom'

const Routes = () => {
  return (
    <Switch>
      <Route path='/users/new' component={NewUser} />
      <Route path='/users' component={Users} />
      <Redirect from='/' exact to='/home' />
      <Redirect to='/not-found' />
    </Switch>
  )
}

export default Routes
