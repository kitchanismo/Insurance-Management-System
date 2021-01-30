import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

import Employee from 'models/employee'
import { EmployeeCard } from './EmployeeCard'
import { MySearchField } from 'components/Common/MySearchField'
import GlobalContext from 'contexts/globalContext'

export interface EmployeesProps {}

export const Employees: React.SFC<EmployeesProps> = () => {
  const { setTitle } = useContext(GlobalContext)!

  useEffect(() => {
    setTitle('Employee Management')
  }, [])

  const employees: Partial<Employee>[] = [
    {
      id: 1,
      firstname: 'Ftname',
      middlename: 'Mee',
      lastname: 'ame',
      position: 'Agency Manager',
      status: 'deactive',
    },
    {
      id: 2,
      firstname: 'Firstname',
      middlename: 'Middlename',
      lastname: 'Lastname',
      position: 'Sales Agent',
      status: 'active',
    },
    {
      id: 3,
      firstname: 'Firstname',
      middlename: 'Middlename',
      lastname: 'Lastname',
      position: 'Branch Manager',
      status: 'deceased',
    },

    {
      id: 4,
      firstname: 'Firstname',
      middlename: 'Middlename',
      lastname: 'Lastname',
      position: 'Supervisor',
      status: 'active',
    },
  ]

  const history = useHistory()

  const styles = useStyles()
  return (
    <>
      <MySearchField style={{ marginBottom: 15 }} />

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
