import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import Pagination from '@material-ui/lab/Pagination'
import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

import EmployeeCard from './EmployeeCard'
import MySearchField from 'components/common/MySearchField'
import { GlobalContext } from 'providers/GlobalProvider'
import { EmployeeContext } from 'providers/EmployeeProvider'
import { getEmployees, GetEmployeesProps } from 'services/employeeService'
import MySkeletonCards from 'components/common/MySkeletonCards'
import MyChips, { MyChip } from 'components/common/MyChips'
import Scroll from 'react-scroll'
import qs from 'query-string'
import MyAlertDialog, { AlertDataProps } from 'components/common/MyAlertDialog'
import { archiveEmployee } from 'services/employeeService'
import Employee from 'models/employee'

export interface EmployeesProps {}

const Employees: React.SFC<EmployeesProps> = () => {
  const [_, globalDispatch] = useContext(GlobalContext)!
  const [employeeState, employeeDispatch] = useContext(EmployeeContext)!

  const scroll = Scroll.animateScroll

  const history = useHistory()

  const location = useLocation()

  const [page, setPage] = useState(1)

  const [chip, setChip] = useState<MyChip>({ value: '', name: 'All' })

  const styles = useStyles()

  useEffect(() => {
    globalDispatch({ type: 'SET_TITLE', payload: 'Employee Management' })
    const { page, search } = qs.parse(location.search)
    const currentPage = !!page ? +page : 1
    setPage(currentPage)
    onLoad({
      page: currentPage,
      search: (search as string) || '',
    })
    return () => {
      globalDispatch({ type: 'SET_IS_LOADING', payload: false })
    }
  }, [])

  const onLoad = ({ page, category, search }: GetEmployeesProps) => {
    globalDispatch({ type: 'SET_IS_LOADING', payload: true })
    employeeDispatch({ type: 'SET_IS_LOADING', payload: true })
    getEmployees({ page, category, search }).then(
      ({ employees, pages, total }) => {
        employeeDispatch({
          type: 'ON_LOAD_EMPLOYEES',
          payload: { employees, pages, total },
        })
        globalDispatch({ type: 'SET_IS_LOADING', payload: false })
        scroll.scrollToTop({ duration: 1000 })
      }
    )
  }

  const onFilter = (chip: MyChip) => {
    setChip(chip)
    employeeDispatch({ type: 'SET_TOTAL', payload: 0 })
    setPage(1)
    onLoad({ page: 1, category: chip.value })
  }

  const onPage = (e: any, page: number) => {
    employeeDispatch({ type: 'SET_TOTAL', payload: 0 })
    setPage(page)
    onLoad({ page, category: chip.value })
    history.push('/employees?page=' + page)
  }

  const onSearch = (search: string) => {
    setChip({ value: '', name: 'All' })
    setPage(1)
    onLoad({ page: 1, search })
    history.push('/employees?search=' + search)
  }

  const isLoading = employeeState.isLoading && !employeeState.employees.length

  const chips: MyChip[] = [
    { value: '', name: 'All' },
    { value: 'active', name: 'Active' },
    { value: 'deactive', name: 'Deactive' },
    { value: 'deceased', name: 'Deceased' },
    { value: 1, name: 'Branch Manager' },
    { value: 2, name: 'Agency Manager' },
    { value: 3, name: 'Supervisor' },
    { value: 4, name: 'Sales Agent' },
  ]

  const [alertDialog, setAlertDialog] = useState<AlertDataProps>({})

  const [employee, setEmployee] = useState<Employee>()

  const handleSelectedEmployee = (employee: Employee) => {
    setEmployee(employee)
    setAlertDialog({
      open: true,
      text: `Are you sure you want to archive ${employee.lastname}, ${employee.firstname} ${employee.middlename}?`,
      description:
        'Archiving will not permanently delete the employee account in the database.',
    })
  }

  const handleArchive = () => {
    archiveEmployee(employee?.id!).then((data) => {
      onLoad({
        page,
      })
      globalDispatch({
        type: 'SET_ALERT',
        payload: { message: 'Successfully archived', type: 'success' },
      })
      setChip({ value: '', name: 'All' })
    })
    setAlertDialog({
      open: false,
    })
  }

  return (
    <>
      <MyAlertDialog
        onAgree={handleArchive}
        onDisagree={() => setAlertDialog({ open: false })}
        data={alertDialog}
      />
      <MySearchField
        label='Name / Branch'
        labelWidth={110}
        onSearch={onSearch}
        style={{ marginBottom: 5 }}
      />

      <MyChips
        count={employeeState.total}
        active={chip}
        onChipSelected={onFilter}
        chips={chips}
      />

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
            <Grid item xs={12}>
              <EmployeeCard
                onArchive={handleSelectedEmployee}
                employee={employee}
              />
            </Grid>
          ))}
          <Pagination
            style={{ marginTop: 15, marginBottom: 15 }}
            variant='outlined'
            color='primary'
            count={employeeState.pages}
            siblingCount={0}
            page={page}
            onChange={onPage}
          />
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
      bottom: 60,
      right: 20,
    },
  })
)

export default Employees
