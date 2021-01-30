import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { GlobalContext } from 'hooks/useGlobalState'
import validator from '../../../../validators/saveEmployeeValidator'
import MyForm, { MyFormProps, InputProps } from 'components/Common/MyForm'
import Employee from 'models/employee'

export interface NewUserProps {}

const NewEmployee: React.SFC<NewUserProps> = () => {
  const [_, dispatch] = useContext(GlobalContext)!

  const history = useHistory()

  const [employee, setEmployee] = React.useState<Employee>({
    firstname: 'dfdf',
    middlename: '',
    lastname: '',
    address: '',
    contact: '',
  })

  const onSubmit = async (data: Employee) => {
    console.log(data)
    dispatch({
      type: 'setAlert',
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
      {({ myInput, mySelect, myDateTimePicker, myButton }) => (
        <>
          {myInput({
            label: 'Firstname',
            value: employee.firstname,
            name: 'firstname',
          })}
          {myInput({
            label: 'Middlename',
            value: employee.middlename,
            name: 'middlename',
          })}
          {myInput({
            label: 'Lastname',
            value: employee.lastname,
            name: 'lastname',
          })}
          {myInput({
            label: 'Contact Number',
            value: employee.contact,
            name: 'contact',
          })}

          {myInput({
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
                style={{ paddingTop: 15, paddingBottom: 15 }}
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
export default NewEmployee
