import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import MyForm, { MyFormProps, InputProps } from 'components/common/myForm'
import User from 'models/user'
import GlobalContext from 'providers/contexts/globalContext'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import validator from './validator'

export interface NewUserProps {}

const NewUser: React.SFC<NewUserProps> = () => {
  const ctx = useContext(GlobalContext)

  const history = useHistory()

  const [newUser, setNewUser] = React.useState<User>({
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
    state: [newUser, setNewUser],
    onSubmit,
    validator,
  }

  const [isVisible, setIsVisible] = React.useState<boolean>(false)

  return (
    <Grid container direction='column'>
      <MyForm {...formProps}>
        {({
          myInput,
          myInputPassword,
          mySelect,
          myDateTimePicker,
          myButton,
        }) => (
          <>
            {myInput({
              label: 'Username',
              value: newUser.username,
              name: 'username',
            })}
            {myInputPassword({
              label: 'Password',
              value: newUser.password,
              name: 'password',
              type: isVisible ? 'text' : 'password',
              onTogglePassword: setIsVisible,
            })}
            {myInput({
              label: 'Firstname',
              value: newUser.firstname,
              name: 'firstname',
            })}
            {myInput({
              label: 'Middlename',
              value: newUser.middlename,
              name: 'middlename',
            })}
            {myInput({
              label: 'Lastname',
              value: newUser.lastname,
              name: 'lastname',
            })}
            {myInput({
              label: 'Contact Number',
              value: newUser.contact,
              name: 'contact',
            })}

            {myInput({
              label: 'Address',
              value: newUser.address,
              name: 'address',
              isMultiline: true,
            })}
            {mySelect({
              label: 'Gender',
              value: newUser.gender,
              name: 'gender',
              options: ['Male', 'Female', 'Other'],
            })}
            {mySelect({
              label: 'Civil Status',
              value: newUser.civil,
              name: 'civil',
              options: ['Single', 'Married', 'Widowed'],
            })}

            {mySelect({
              label: 'Position',
              value: newUser.position,
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
              value: newUser.branch,
              name: 'branch',
              options: ['CEBU', 'MAKATI', 'MANILA'],
            })}

            {mySelect({
              label: 'Team',
              value: newUser.team,
              name: 'team',
              options: ['ABC', '123', 'XYZ'],
            })}

            {myDateTimePicker({
              label: 'Birthdate',
              value: newUser.birthdate,
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
                  onClick={() => history.push('/users')}
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
    </Grid>
  )
}

export default NewUser
