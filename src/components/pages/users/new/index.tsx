import Grid from '@material-ui/core/Grid'
import MyForm from 'components/common/myForm'
import React from 'react'

export interface NewUserProps {}

const NewUser: React.SFC<NewUserProps> = () => {
  const [user, setUser] = React.useState({
    username: '',
    firstname: '',
  })
  const onSubmit = async () => {
    return Promise.resolve()
  }

  return (
    <Grid container direction='column'>
      <MyForm state={[user, setUser]} onSubmit={onSubmit}>
        {({ myInput }) => (
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
          </>
        )}
      </MyForm>
    </Grid>
  )
}

export default NewUser
