import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

import EmployeeCard from './EmployeeCard'
import MySearchField from 'components/common/MySearchField'
import { GlobalContext } from 'providers/GlobalProvider'
import { EmployeeContext } from 'providers/EmployeeProvider'
import { getEmployees } from 'services/employeeService'
import MySkeletonCards from 'components/common/MySkeletonCards'
import MyChips from 'components/common/MyChips'

export interface EmployeesProps {}

const Employees: React.SFC<EmployeesProps> = () => {
  const [_, globalDispatch] = useContext(GlobalContext)!
  const [employeeState, employeeDispatch] = useContext(EmployeeContext)!

  const history = useHistory()

  const styles = useStyles()

  useEffect(() => {
    globalDispatch({ type: 'SET_TITLE', payload: 'Employee Management' })
    globalDispatch({ type: 'SET_IS_LOADING', payload: true })
    employeeDispatch({ type: 'SET_IS_LOADING', payload: true })
    getEmployees().then((employees) => {
      employeeDispatch({ type: 'ON_LOAD_EMPLOYEES', payload: employees })
      globalDispatch({ type: 'SET_IS_LOADING', payload: false })
    })
  }, [])

  const isLoading = employeeState.isLoading && !employeeState.employees.length

  const chips = [
    'All',
    'Branch Manager',
    'Agency Manager',
    'Supervisor',
    'Sales Agent',
    'Active',
    'Deactive',
    'Deceased',
  ]

  return (
    <>
      <MySearchField style={{ marginBottom: 15 }} />

      <MyChips active='All' chips={chips}></MyChips>

      {isLoading && <MySkeletonCards />}
      {!isLoading && (
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
      )}

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
