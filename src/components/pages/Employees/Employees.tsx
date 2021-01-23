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

import Employee from 'models/employee'
import { EmployeeCard } from './EmployeeCard'

export interface EmployeesProps {}

export const Employees: React.SFC<EmployeesProps> = () => {
  const employees: Partial<Employee>[] = [
    {
      id: 1,
      firstname: 'Firstname',
      middlename: 'Middlename',
      lastname: 'Lastname',
      position: 'Admin',
    },
    {
      id: 2,
      firstname: 'Firstname',
      middlename: 'Middlename',
      lastname: 'Lastname',
      position: 'Sales Agent',
      is_active: true,
    },
    {
      id: 3,
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
        {employees.map((employee) => (
          <Grid key={employee.id} item xs={12}>
            <EmployeeCard employee={employee} />
          </Grid>
        ))}
      </Grid>

      <Fab
        onClick={() => history.push('/employees/new')}
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
