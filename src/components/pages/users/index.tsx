import Grid from '@material-ui/core/Grid'
import User from 'models/user'
import React from 'react'
import UserCard from './card'

export interface UsersProps {}

const Users: React.SFC<UsersProps> = () => {
  const users: Partial<User>[] = [
    {
      id: 1,
      username: 'myusername',
      firstname: 'kitchan',
      middlename: 'dela vega',
      lastname: 'betsayda',
      position: 'Admin',
    },
    {
      id: 2,
      username: 'urusername',
      firstname: 'firstname',
      middlename: 'middlename',
      lastname: 'lastname',
      position: 'Sales Agent',
    },
    {
      id: 3,
      username: 'sample',
      firstname: 'firstname',
      middlename: 'middlename',
      lastname: 'lastname',
      position: 'Branch Manager',
    },
  ]
  return (
    <Grid
      container
      spacing={2}
      direction='column'
      justify='flex-start'
      alignItems='center'
    >
      {users.map((user) => (
        <Grid key={user.id} item xs={12}>
          <UserCard user={user} />
        </Grid>
      ))}
    </Grid>
  )
}

export default Users
