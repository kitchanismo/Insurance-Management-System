import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import GlobalContext from 'contexts/globalContext'
import validator from '../validator'
import { MyForm, MyFormProps } from 'components/Common/MyForm'
import Employee from 'models/employee'

export interface EditUserProps {}

export const EditEmployee: React.SFC<EditUserProps> = () => {
  const ctx = useContext(GlobalContext)

  const history = useHistory()

  const [employee, setEmployee] = React.useState<Employee>({
    firstname: 'sds',
    middlename: 'dfdf',
    lastname: 'fgf',
    address: 'fgf',
    contact: 'fgfg',
    gender: null,
    civil: null,
    birthdate: null,
    position: null,
    branch: null,
    team: null,
  })

  const onSubmit = async (data: Employee) => {
    console.log(data)
    ctx?.setAlert({ message: 'Successfully added', type: 'success' })
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
            options: ['Male', 'Female', 'Other'],
          })}
          {mySelect({
            label: 'Civil Status',
            value: employee.civil,
            name: 'civil',
            options: ['Single', 'Married', 'Widowed'],
          })}

          {mySelect({
            label: 'Position',
            value: employee.position,
            name: 'position',
            options: [
              'Sales Agent',
              'Branch Manager',
              'Agency Manager',
              'Supervisor',
              'Admin',
            ],
          })}

          {mySelect({
            label: 'Branch',
            value: employee.branch,
            name: 'branch',
            options: ['CEBU', 'MAKATI', 'MANILA'],
          })}

          {mySelect({
            label: 'Team',
            value: employee.team,
            name: 'team',
            options: ['ABC', '123', 'XYZ'],
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
