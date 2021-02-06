import React, { useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { GlobalContext } from 'providers/GlobalProvider'
import validator from '../../../../validators/saveEmployeeValidator'
import MyForm, { MyFormProps } from 'components/common/MyForm'
import Employee from 'models/employee'
import { EmployeeContext } from 'providers/EmployeeProvider'
import { getEmployees } from 'api/employeeService'

export interface EditUserProps {}

const EditEmployee: React.SFC<EditUserProps> = () => {
  const [_, globalDispatch] = useContext(GlobalContext)!

  const [employeeState, employeeDispatch] = useContext(EmployeeContext)!

  const history = useHistory()

  const { id } = useParams<{ id: string }>()

  const [employee, setEmployee] = React.useState<Employee>({
    address: '',
    firstname: '',
    middlename: '',
    lastname: '',
    contact: '',
  })

  useEffect(() => {
    globalDispatch({ type: 'SET_TITLE', payload: 'EDIT EMPLOYEE' })
    employeeDispatch({ type: 'ON_GET_EMPLOYEE', payload: +id })
    setEmployee(employeeState.employee)
  }, [employeeState.employee])

  const onSubmit = async (data: Employee) => {
    console.log(data)
    globalDispatch({
      type: 'SET_ALERT',
      payload: { message: 'Successfully added', type: 'success' },
    })

    return Promise.resolve()
  }

  const formProps: MyFormProps<Employee> = {
    state: [employee, setEmployee],
    onSubmit,
    validator,
  }

  return (
    <MyForm {...formProps}>
      {({
        myInput,
        mySelect,
        myDateTimePicker,
        myButton,
        myControlledInput,
      }) => (
        <>
          {myControlledInput({
            label: 'Firstname',
            value: employee.firstname,
            name: 'firstname',
          })}
          {myControlledInput({
            label: 'Middlename',
            value: employee.middlename,
            name: 'middlename',
          })}
          {myControlledInput({
            label: 'Lastname',
            value: employee.lastname,
            name: 'lastname',
          })}
          {myControlledInput({
            label: 'Contact Number',
            value: employee.contact,
            name: 'contact',
          })}

          {myControlledInput({
            label: 'Address',
            value: employee.address,
            name: 'address',
            isMultiline: true,
          })}

          {mySelect({
            label: 'Gender',
            value: employee.gender,
            name: 'gender',
            options: [
              { value: 'Male' },
              { value: 'Female' },
              { value: 'Other' },
            ],
          })}

          {mySelect({
            label: 'Civil Status',
            value: employee.civil,
            name: 'civil',
            labelWidth: 80,
            options: [
              { value: 'Single' },
              { value: 'Married' },
              { value: 'Widowed' },
            ],
          })}

          {mySelect({
            label: 'Position',
            value: employee.position,
            name: 'position',
            labelWidth: 55,
            options: [
              { value: 'Sales Agent' },
              { value: 'Branch Manager' },
              { value: 'Agency Manager' },
              { value: 'Supervisor' },
            ],
          })}

          {mySelect({
            label: 'Branch',
            value: employee.branch,
            name: 'branch',
            labelWidth: 55,
            options: [{ value: 'Cebu' }, { value: 'Manila' }],
          })}

          {mySelect({
            label: 'Team',
            value: employee.team,
            name: 'team',
            labelWidth: 40,
            options: [{ value: 'ABC' }],
          })}

          {mySelect({
            label: 'Status',
            value: employee.status,
            name: 'status',
            labelWidth: 40,
            options: [
              { value: 'active', name: 'Active' },
              { value: 'deactive', name: 'Deactive' },
              { value: 'deceased', name: 'Deceased' },
            ],
          })}

          {myDateTimePicker({
            label: 'Birthdate',
            value: employee.birthdate,
            name: 'birthdate',
          })}

          <Grid
            style={{ paddingLeft: 18, paddingTop: 10, paddingBottom: 5 }}
            container
            xs={12}
            justify='center'
            spacing={2}
          >
            <Grid item xs={6}>
              <Button
                onClick={() => history.goBack()}
                fullWidth
                variant='contained'
                color='default'
              >
                BACK
              </Button>
            </Grid>
            <Grid item xs={6}>
              {myButton()}
            </Grid>
          </Grid>
        </>
      )}
    </MyForm>
  )
}
export default EditEmployee
