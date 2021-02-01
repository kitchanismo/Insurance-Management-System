import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

import Employee from 'models/employee'
import EmployeeCard from './EmployeeCard'
import MySearchField from 'components/common/MySearchField'
import { GlobalContext } from 'hooks/useGlobalState'
import { EmployeeContext } from 'providers/EmployeeProvider'
import { getEmployees } from 'api/employeeService'

export interface EmployeesProps {}

const Employees: React.SFC<EmployeesProps> = () => {
  const [_, globalDispatch] = useContext(GlobalContext)!
  const [employeeState, employeeDispatch] = useContext(EmployeeContext)!

  useEffect(() => {
    globalDispatch({ type: 'setTitle', payload: 'Employee Management' })
    getEmployees().then((employees) =>
      employeeDispatch({ type: 'ON_LOAD_EMPLOYEES', payload: employees }),
    )
  }, [])

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
        {employeeState.employees.map((employee) => (
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

export default Employees
