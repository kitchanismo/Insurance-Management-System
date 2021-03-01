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
import { getUser, updateUser } from 'services/userService'
import { UserContext } from 'providers/UserProvider'
import { postImage } from 'services/imageService'
import { getBranches } from 'services/branchService'
import { BranchContext } from 'providers/BranchProvider'
import User from 'models/user'

export interface EditUserProps {}

const EditUser: React.SFC<EditUserProps> = () => {
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
  })

  useEffect(() => {
    globalDispatch({ type: 'SET_TITLE', payload: 'Edit User' })

    getUser(+params.id).then((user) => setUser(user))
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
      return updateUser(user).then(() => {
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
export default EditUser
