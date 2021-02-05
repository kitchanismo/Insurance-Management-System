import { useHistory, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import MyForm, { MyFormProps } from 'components/common/MyForm'
import validator from 'validators/saveProfileValidator'
import Profile from 'models/profile'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { ClientContext } from 'providers/ClientProvicer'
import { GlobalContext } from 'providers'

export interface EditClientProps {}

const EditClient: React.SFC<EditClientProps> = () => {
  const history = useHistory()
  const params = useParams<{ id: string }>()

  const [_, globalDispatch] = useContext(GlobalContext)!

  const [clientState, clientDispatch] = useContext(ClientContext)!

  const [profile, setProfile] = useState<Profile>({
    firstname: '',
    middlename: '',
    lastname: '',
    address: '',
    contact: '',
  })

  useEffect(() => {
    globalDispatch({ type: 'SET_TITLE', payload: 'EDIT CLIENT PROFILE' })
    const profile = clientState.clients.filter(
      (client) => client.id === +params.id,
    )[0]
    setProfile(profile)
  }, [])

  const onSubmit = async (profile: Profile) => {
    console.log(profile)
  }

  const formProps: MyFormProps<Profile> = {
    state: [profile, setProfile],
    onSubmit,
    validator,
  }

  return (
    <MyForm {...formProps}>
      {({ myControlledInput, mySelect, myDateTimePicker, myButton }) => (
        <>
          {myControlledInput({
            label: 'Firstname',
            value: profile.firstname,
            name: 'firstname',
          })}
          {myControlledInput({
            label: 'Middlename',
            value: profile.middlename,
            name: 'middlename',
          })}
          {myControlledInput({
            label: 'Lastname',
            value: profile.lastname,
            name: 'lastname',
          })}
          {myControlledInput({
            label: 'Contact Number',
            value: profile.contact,
            name: 'contact',
          })}

          {myControlledInput({
            label: 'Address',
            value: profile.address,
            name: 'address',
            isMultiline: true,
          })}
          {mySelect({
            label: 'Gender',
            value: profile.gender,
            name: 'gender',
            options: [
              { value: 'Male' },
              { value: 'Female' },
              { value: 'Other' },
            ],
          })}

          {mySelect({
            label: 'Civil Status',
            value: profile.civil,
            name: 'civil',
            labelWidth: 80,
            options: [
              { value: 'Single' },
              { value: 'Married' },
              { value: 'Widowed' },
            ],
          })}

          {myDateTimePicker({
            label: 'Birthdate',
            value: profile.birthdate,
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
                onClick={() => history.goBack()}
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
  )
}

export default EditClient
