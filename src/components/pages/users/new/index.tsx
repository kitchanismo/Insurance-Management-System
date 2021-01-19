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
  const { user, setUser } = useContext<UserProps>(UserContext)

  const onSubmit = async () => {
    console.log(user)
    setAlert({ message: 'Successfully added', type: 'success' })
    return Promise.resolve()
  }

  const formProps: MyFormProps<User> = {
    state: [user, setUser],
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
              value: user.username,
              name: 'username',
            })}
            {myInput({
              label: 'Password',
              value: user.password,
              name: 'password',
              type: 'password',
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
              label: 'Civi Status',
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

            {myButton()}
          </>
        )}
      </MyForm>
    </Grid>
  )
}

export default NewUser
