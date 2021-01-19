import Grid from '@material-ui/core/Grid'
import MyForm, { MyFormProps } from 'components/common/myForm'
import User from 'models/user'
import UserContext, { UserProps } from 'providers/contexts/userContext'
import GlobalContext, { GlobalProps } from 'providers/contexts/globalContext'
import React, { useContext } from 'react'
import validator from './validator'

export interface NewUserProps {}

const NewUser: React.SFC<NewUserProps> = () => {
  const { setAlert } = useContext<GlobalProps>(GlobalContext)

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
    setAlert({ message: 'Successfully added', type: 'success' })
    return Promise.resolve()
  }

  const formProps: MyFormProps<User> = {
    state: [newUser, setNewUser],
    onSubmit,
    validator,
  }

  return (
    <Grid container direction='column'>
      <MyForm {...formProps}>
        {({ myInput, mySelect, myDateTimePicker, myButton }) => (
          <>
            {myInput({
              label: 'Username',
              value: newUser.username,
              name: 'username',
            })}
            {myInput({
              label: 'Password',
              value: newUser.password,
              name: 'password',
              type: 'password',
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

            {myButton()}
          </>
        )}
      </MyForm>
    </Grid>
  )
}

export default NewUser
