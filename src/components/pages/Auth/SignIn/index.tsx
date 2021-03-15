import Grid from '@material-ui/core/Grid'
import MyForm, { MyFormProps } from 'components/common/MyForm'
import User from 'models/user'
import { onSignIn } from 'services/authService'
import validator from 'validators/signInValidator'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Fade from 'react-reveal/Fade'
import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalContext } from 'providers/GlobalProvider'
import logo from 'assets/logo.jpg'

import { getCurrentUser, saveToken, nameCapitalize } from 'utils/helper'

export interface SignInProps {}

const SignIn: React.SFC<SignInProps> = () => {
  const styles = useStyles()

  const [state, dispatch] = useContext(GlobalContext)!

  const history = useHistory()

  useEffect(() => {
    dispatch({ type: 'SET_TITLE', payload: 'BRAND NAME' })
  }, [])

  const [user, setUser] = useState<User>({
    username: '',
    password: '',
  })

  const onSubmit = async (user: User) => {
    return onSignIn(user)
      .then((access_token) => {
        saveToken(access_token)
        const currentUser = getCurrentUser()
        dispatch({ type: 'SET_CURRENT_USER', payload: currentUser })
        // dispatch({
        //   type: 'SET_ALERT',
        //   payload: {
        //     message: `Welcome, ${nameCapitalize(currentUser.username)}`,
        //     type: 'success',
        //   },
        // })
      })
      .catch(({ response }) => {
        if (response.status === 401) {
          dispatch({
            type: 'SET_ALERT',
            payload: {
              message: response.data.error,
              type: 'error',
            },
          })
        }
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
        style={{ marginTop: 20 }}
        direction='row'
        container
        justify='center'
        alignItems='flex-start'
      >
        <Fade delay={500}>
          <img
            style={{
              paddingLeft: 20,
              paddingRight: 20,
              zIndex: 1,
              borderRadius: 10,
              backgroundColor: 'white',
              marginTop: 30,
              boxShadow:
                '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            }}
            width={250}
            src={logo}
            alt='brand logo'
          />
        </Fade>
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
      marginTop: 50,
      paddingLeft: 20,
      paddingRight: 20,
    },
  })
)

export default SignIn
