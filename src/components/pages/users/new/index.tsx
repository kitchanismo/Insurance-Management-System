import Grid from '@material-ui/core/Grid'
import MyForm from 'components/common/myForm'
import User from 'models/user'
import React from 'react'

export interface NewUserProps {}

const NewUser: React.SFC<NewUserProps> = () => {
  const [user, setUser] = React.useState<User>({
    username: '',
    password: '',
    firstname: '',
    middlename: '',
    lastname: '',
    gender: '',
    civil: '',
    birthdate: null,
    position: '',
    branch: '',
    team: '',
    created_at: new Date(Date.now()),
  })
  const onSubmit = async () => {
    return Promise.resolve()
  }

  return (
    <Grid container direction='column'>
      <MyForm state={[user, setUser]} onSubmit={onSubmit}>
        {({ myInput, mySelect, myDateTimePicker }) => (
          <>
            {myInput({
              label: 'Username',
              value: user.username,
              name: 'username',
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
            {mySelect({
              label: 'Gender',
              value: user.gender,
              name: 'gender',
              options: ['Male', 'Female', 'Other'],
            })}
            {myInput({
              label: 'Address',
              value: user.address,
              name: 'address',
              isMultiline: true,
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
          </>
        )}
      </MyForm>
    </Grid>
  )
}

export default NewUser
