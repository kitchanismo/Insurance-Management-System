import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import GlobalContext from 'providers/contexts/globalContext'
import validator from '../validator'
import { MyForm, MyFormProps } from 'components/Common/MyForm'
import User from 'models/user'

export interface EditUserProps {}

export const EditUser: React.SFC<EditUserProps> = () => {
  const ctx = useContext(GlobalContext)

  const history = useHistory()

  const [user, setUser] = React.useState<User>({
    username: '',
    password: '',
    firstname: '',
    middlename: '',
    lastname: '',
    address: '',
    contact: '',
    gender: null,
    civil: null,
    birthdate: null,
    position: null,
    branch: null,
    team: null,
  })

  const onSubmit = async () => {
    ctx?.setAlert({ message: 'Successfully added', type: 'success' })
    return Promise.resolve()
  }

  const formProps: MyFormProps<User> = {
    state: [user, setUser],
    onSubmit,
    validator,
  }

  const [isVisible, setIsVisible] = React.useState<boolean>(false)

  return (
    <MyForm {...formProps}>
      {({ myInput, myInputPassword, mySelect, myDateTimePicker, myButton }) => (
        <>
          {myInput({
            label: 'Username',
            value: user.username,
            name: 'username',
          })}
          {myInputPassword({
            label: 'Password',
            value: user.password,
            name: 'password',
            type: isVisible ? 'text' : 'password',
            onTogglePassword: setIsVisible,
          })}
          {myInput({
            label: 'Firstname',
            value: user.firstname,
            name: 'firstname',
          })}
          {myInput({
            label: 'Middlename',
            value: user.middlename,
            name: 'middlename',
          })}
          {myInput({
            label: 'Lastname',
            value: user.lastname,
            name: 'lastname',
          })}
          {myInput({
            label: 'Contact Number',
            value: user.contact,
            name: 'contact',
          })}

          {myInput({
            label: 'Address',
            value: user.address,
            name: 'address',
            isMultiline: true,
          })}
          {mySelect({
            label: 'Gender',
            value: user.gender,
            name: 'gender',
            options: ['Male', 'Female', 'Other'],
          })}
          {mySelect({
            label: 'Civil Status',
            value: user.civil,
            name: 'civil',
            options: ['Single', 'Married', 'Widowed'],
          })}

          {mySelect({
            label: 'Position',
            value: user.position,
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
            value: user.branch,
            name: 'branch',
            options: ['CEBU', 'MAKATI', 'MANILA'],
          })}

          {mySelect({
            label: 'Team',
            value: user.team,
            name: 'team',
            options: ['ABC', '123', 'XYZ'],
          })}

          {myDateTimePicker({
            label: 'Birthdate',
            value: user.birthdate,
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
