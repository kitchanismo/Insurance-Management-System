import React from 'react'
import { useHistory } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import AddIcon from '@material-ui/icons/Add'

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

import User from 'models/user'
import { UserCard } from './UserCard'

export interface UsersProps {}

export const Users: React.SFC<UsersProps> = () => {
  const users: Partial<User>[] = [
    {
      id: 1,
      username: 'myusername',
      firstname: 'Firstname',
      middlename: 'Middlename',
      lastname: 'Lastname',
      position: 'Admin',
    },
    {
      id: 2,
      username: 'urusername',
      firstname: 'Firstname',
      middlename: 'Middlename',
      lastname: 'Lastname',
      position: 'Sales Agent',
      is_active: true,
    },
    {
      id: 3,
      username: 'sample',
      firstname: 'Firstname',
      middlename: 'Middlename',
      lastname: 'Lastname',
      position: 'Branch Manager',
    },
  ]

  const history = useHistory()

  const styles = useStyles()
  return (
    <>
      <Grid style={{ marginBottom: 15 }} container xs={12}>
        <FormControl fullWidth variant='outlined'>
          <InputLabel htmlFor='outlined-adornment-password'>
            Search...
          </InputLabel>
          <OutlinedInput
            id='outlined-adornment-password'
            name='search'
            type='text'
            labelWidth={65}
            endAdornment={
              <InputAdornment position='end'>
                <IconButton aria-label='toggle password visibility'>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
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
