import { useHistory, useParams } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import MyForm, { MyFormProps } from 'components/common/MyForm'
import validator from 'validators/saveProfileValidator'
import Profile from 'models/profile'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import { ClientContext } from 'providers/ClientProvider'
import { GlobalContext } from 'providers/GlobalProvider'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import Typography from '@material-ui/core/Typography'
import { postImage } from 'services/imageService'
import { getClient, updateClient } from 'services/clientService'

export interface EditClientProps {}

const EditClient: React.SFC<EditClientProps> = () => {
  const history = useHistory()
  const params = useParams<{ id: string }>()

  const [_, globalDispatch] = useContext(GlobalContext)!

  const [clientState, clientDispatch] = useContext(ClientContext)!

  const [imageFile, setImageFile] = useState<HTMLImageElement | null>(null)

  const [profile, setProfile] = useState<Profile & { insured_date?: Date }>({
    firstname: '',
    middlename: '',
    lastname: '',
    address: '',
    contact: '',
  })

  useEffect(() => {
    globalDispatch({ type: 'SET_TITLE', payload: 'Edit Client Profile' })
    getClient(+params.id).then((client) =>
      setProfile({
        ...client.profile,
        id: client.id,
        insured_date: client.created_at,
      })
    )
  }, [])

  const onSubmit = async (profile: Profile) => {
    return postImage(profile?.image!, (image_url: string) => {
      delete profile.image

      return updateClient({
        ...profile,
        image_url: !!image_url ? image_url : profile.image_url,
      })
        .then(() => {
          globalDispatch({
            type: 'SET_ALERT',
            payload: { message: 'Successfully saved', type: 'success' },
          })
          globalDispatch({ type: 'SET_IS_LOADING', payload: false })
        })
        .catch((error) => {
          if (error.response.status === 400) {
            globalDispatch({
              type: 'SET_ALERT',
              payload: { message: error.response.data.error, type: 'error' },
            })
          }
          globalDispatch({ type: 'SET_IS_LOADING', payload: false })
        })
    })
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
            value: profile?.firstname,
            name: 'firstname',
          })}
          {myControlledInput({
            label: 'Middlename',
            value: profile?.middlename,
            name: 'middlename',
          })}
          {myControlledInput({
            label: 'Lastname',
            value: profile?.lastname,
            name: 'lastname',
          })}
          {myControlledInput({
            label: 'Contact Number',
            value: profile?.contact,
            name: 'contact',
          })}

          {myControlledInput({
            label: 'Address',
            value: profile?.address,
            name: 'address',
            isMultiline: true,
          })}
          {mySelect({
            label: 'Gender',
            value: profile?.gender,
            name: 'gender',
            options: [
              { value: 'Male' },
              { value: 'Female' },
              { value: 'Other' },
            ],
          })}

          {mySelect({
            label: 'Civil Status',
            value: profile?.civil,
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
            value: profile?.birthdate,
            name: 'birthdate',
          })}

          {myDateTimePicker({
            label: 'Insured Date',
            value: profile?.insured_date,
            name: 'insured_date',
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
              <Button
                onClick={() => history.goBack()}
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
