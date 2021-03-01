import React, { useContext, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import Grid from '@material-ui/core/Grid'
import { GlobalContext } from 'providers/GlobalProvider'
import validator from 'validators/editUserValidator'
import MyForm, { MyFormProps, InputProps } from 'components/common/MyForm'
import { getMe, updateAccount } from 'services/userService'
import { UserContext } from 'providers/UserProvider'
import { postImage } from 'services/imageService'
import { getBranches } from 'services/branchService'
import { BranchContext } from 'providers/BranchProvider'
import User from 'models/user'
import { getCurrentUser, saveToken } from 'utils/helper'

export interface AccountSettingsProps {}

const AccountSettings: React.SFC<AccountSettingsProps> = () => {
  const [{ currentUser }, globalDispatch] = useContext(GlobalContext)!

  const params = useParams<{ id: string }>()

  const [branchState, branchDispatch] = useContext(BranchContext)!

  const [imageFile, setImageFile] = React.useState<HTMLImageElement | null>(
    null
  )

  const [user, setUser] = React.useState<User>({
    username: '',
    firstname: '',
    middlename: '',
    lastname: '',
    role: 'cashier',
    password: '',
    new_password: '',
  })

  useEffect(() => {
    globalDispatch({ type: 'SET_TITLE', payload: 'Account Settings' })

    getMe().then((user) => {
      setUser({ ...user, branch: user?.branch?.id })
    })
    getBranches().then((branches) =>
      branchDispatch({ type: 'ON_LOAD_BRANCHES', payload: branches })
    )
  }, [])

  const history = useHistory()

  const onSubmit = async (user: User) => {
    globalDispatch({ type: 'SET_IS_LOADING', payload: true })

    return postImage(user?.image!, (image_url: string) => {
      user.image_url = image_url
      delete user.image
      return updateAccount(user).then(({ access_token }) => {
        globalDispatch({
          type: 'SET_ALERT',
          payload: { message: 'Successfully updated', type: 'success' },
        })
        globalDispatch({ type: 'SET_IS_LOADING', payload: false })
        saveToken(access_token)
        globalDispatch({ type: 'SET_CURRENT_USER', payload: getCurrentUser() })
        window.location.href = '/dashboard'
      })
    }).catch(({ response }) => {
      if (response.status === 401) {
        globalDispatch({ type: 'SET_IS_LOADING', payload: false })
        globalDispatch({
          type: 'SET_ALERT',
          payload: {
            message: response.data.error,
            type: 'error',
          },
        })
      }
    })
  }

  const { role, branch, ...cashierValidator } = validator

  const formProps: MyFormProps<User> = {
    state: [user, setUser],
    onSubmit,
    validator: user.role !== 'admin' ? cashierValidator : validator,
  }

  return (
    <MyForm {...formProps}>
      {({ myControlledInput, mySelect, myButton }) => (
        <>
          {myControlledInput({
            label: 'Username',
            value: user.username,
            name: 'username',
          })}
          {myControlledInput({
            label: 'Firstname',
            value: user.firstname,
            name: 'firstname',
          })}
          {myControlledInput({
            label: 'Middlename',
            value: user.middlename,
            name: 'middlename',
          })}
          {myControlledInput({
            label: 'Lastname',
            value: user.lastname,
            name: 'lastname',
          })}

          {user.role === 'admin' &&
            mySelect({
              label: 'Role',
              value: user.role,
              name: 'role',
              labelWidth: 55,
              options: [
                { value: 'cashier', name: 'Cashier' },
                { value: 'admin', name: 'Admin' },
              ],
            })}

          {user.role === 'admin' &&
            mySelect({
              label: 'Branch',
              value: user?.branch,
              name: 'branch',
              labelWidth: 55,
              options: branchState.branches.map((branch) => ({
                value: branch.id,
                name: branch.name,
              })),
            })}

          {myControlledInput({
            label: 'Current Password',
            value: user.password,
            name: 'password',
            type: 'password',
          })}
          {myControlledInput({
            label: 'New Password',
            value: user.new_password,
            name: 'new_password',
            type: 'password',
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
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              {myButton()}
            </Grid>
          </Grid>
        </>
      )}
    </MyForm>
  )
}
export default AccountSettings
