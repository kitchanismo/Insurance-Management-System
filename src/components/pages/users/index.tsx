import React from 'react'
import { useHistory } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab'
import TextField from '@material-ui/core/TextField'
import User from 'models/user'
import UserCard from './card'
import makeStyles from '@material-ui/styles/makeStyles'
import createStyles from '@material-ui/styles/createStyles'
import SearchIcon from '@material-ui/icons/Search'
import AddIcon from '@material-ui/icons/Add'

import { Theme, fade } from '@material-ui/core/styles'

export interface UsersProps {}

const Users: React.SFC<UsersProps> = () => {
  const users: Partial<User>[] = [
    {
      id: 1,
      username: 'myusername',
      firstname: 'firstname',
      middlename: 'middlename',
      lastname: 'lastname',
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

  const history = useHistory()

  const styles = useStyles()
  return (
    <>
      <Grid
        style={{ marginBottom: 15, marginTop: -10 }}
        container
        xs={12}
        spacing={1}
        justify='flex-start'
      >
        <Grid item xs={11}>
          <TextField fullWidth id='search-user' label='Search...' />
        </Grid>
        <Grid container justify='center' alignContent='flex-end' item xs={1}>
          <SearchIcon />
        </Grid>
      </Grid>

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

      <Fab
        onClick={() => history.push('/users/new')}
        className={styles.fab}
        color='primary'
        aria-label='add'
      >
        <AddIcon />
      </Fab>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'fixed',
      bottom: 20,
      right: 20,
    },
  }),
)

export default Users
