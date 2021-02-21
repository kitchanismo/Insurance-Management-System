import Grid from '@material-ui/core/Grid'
import MyForm, { MyFormProps } from 'components/common/MyForm'
import User from 'models/user'
import { onSignIn } from 'services/authService'
import validator from 'validators/signInValidator'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalContext } from 'providers/GlobalProvider'
import { userInfo } from 'os'
import { getCurrentUser, saveToken } from 'utils/helper'

export interface SignInProps {}

const SignIn: React.SFC<SignInProps> = () => {
  const styles = useStyles()

  const [state, dispatch] = useContext(GlobalContext)!

  const history = useHistory()

  useEffect(() => {
    dispatch({ type: 'SET_TITLE', payload: 'BRAND NAME' })
  }, [])

  const [user, setUser] = useState<User>({
    username: 'admin123',
    password: 'admin123',
  })

  const onSubmit = async (user: User) => {
    return onSignIn(user).then((access_token) => {
      saveToken(access_token)

      dispatch({ type: 'SET_CURRENT_USER', payload: getCurrentUser() })
      // history.replace('/dashboard')
    })
  }
  const formProps: MyFormProps<User> = {
    state: [user, setUser],
    onSubmit,
    validator,
  }

  return (
    <Grid
      style={{ minHeight: 450 }}
      justify='space-between'
      container
      direction='column'
      xs={12}
    >
      <Grid
        style={{ paddingTop: 80 }}
        direction='row'
        container
        justify='center'
        alignItems='flex-start'
      >
        <h1>Logo</h1>
      </Grid>

      <div className={styles.formContainer}>
        <MyForm {...formProps}>
          {({ myInput, myButton }) => (
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
              {myButton('LOGIN')}
            </>
          )}
        </MyForm>
      </div>
    </Grid>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',

      paddingLeft: 20,
      paddingRight: 20,
    },
  }),
)

export default SignIn
