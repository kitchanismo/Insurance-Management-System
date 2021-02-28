import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import Grid from '@material-ui/core/Grid'
import { GlobalContext } from 'providers/GlobalProvider'
import validator from 'validators/saveUserValidator'
import MyForm, { MyFormProps, InputProps } from 'components/common/MyForm'
import { saveUser } from 'services/userService'
import { UserContext } from 'providers/UserProvider'
import { postImage } from 'services/imageService'
import { getBranches } from 'services/branchService'
import { BranchContext } from 'providers/BranchProvider'
import User from 'models/user'

export interface NewUserProps {}

const NewUser: React.SFC<NewUserProps> = () => {
  const [{ currentUser }, globalDispatch] = useContext(GlobalContext)!

  const [userState, userDispatch] = useContext(UserContext)!

  const [branchState, branchDispatch] = useContext(BranchContext)!

  const [imageFile, setImageFile] = React.useState<HTMLImageElement | null>(
    null
  )

  useEffect(() => {
    globalDispatch({ type: 'SET_TITLE', payload: 'User Registration' })

    getBranches().then((branches) =>
      branchDispatch({ type: 'ON_LOAD_BRANCHES', payload: branches })
    )
  }, [])

  const history = useHistory()

  const [user, setUser] = React.useState<User>({
    username: '',
    firstname: '',
    middlename: '',
    lastname: '',
    role: 'cashier',
    password: '',
  })

  const onSubmit = async (user: User) => {
    globalDispatch({ type: 'SET_IS_LOADING', payload: true })

    return postImage(user?.image!, (image_url: string) => {
      user.image_url = image_url
      delete user.image
      return saveUser(user).then(() => {
        globalDispatch({
          type: 'SET_ALERT',
          payload: { message: 'Successfully added', type: 'success' },
        })
        globalDispatch({ type: 'SET_IS_LOADING', payload: false })
      })
    })
  }

  const formProps: MyFormProps<User> = {
    state: [user, setUser],
    onSubmit,
    validator,
  }

  return (
    <MyForm {...formProps}>
      {({ myInput, mySelect, myButton }) => (
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
            label: 'Password',
            value: user.password,
            name: 'password',
            type: 'password',
          })}

          {mySelect({
            label: 'Role',
            value: user.role,
            name: 'role',
            labelWidth: 55,
            options: [{ value: 'cashier', name: 'Cashier' }],
          })}

          {mySelect({
            label: 'Branch',
            value: user.branch,
            name: 'branch',
            labelWidth: 55,
            options: branchState.branches.map((branch) => ({
              value: branch.id,
              name: branch.name,
            })),
          })}

          <Grid
            container
            style={{
              paddingLeft: 15,
              paddingRight: 15,
              marginBottom: 10,
            }}
            alignItems='center'
            justify='space-between'
            xs={12}
          >
            <Typography variant='subtitle1'>
              {imageFile?.name || 'Select Photo'}
            </Typography>
            <>
              <input
                accept='image/*'
                style={{
                  display: 'none',
                }}
                name='image'
                id='icon-button-file'
                type='file'
                onChange={(e: any) => {
                  setImageFile(e.target.files[0])
                }}
              />
              <label htmlFor='icon-button-file'>
                <IconButton
                  color='primary'
                  aria-label='upload picture'
                  component='span'
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </>
          </Grid>

          <Grid
            style={{ paddingLeft: 18, paddingTop: 10, paddingBottom: 5 }}
            container
            xs={12}
            justify='center'
            spacing={2}
          >
            <Grid item xs={6}>
              {currentUser?.role === 'admin' && (
                <Button
                  onClick={() => history.goBack()}
                  fullWidth
                  variant='contained'
                  color='default'
                >
                  BACK
                </Button>
              )}
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
export default NewUser
