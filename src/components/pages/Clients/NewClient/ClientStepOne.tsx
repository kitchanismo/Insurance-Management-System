import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import GlobalContext from 'contexts/globalContext'
import { MyForm, MyFormProps, InputProps } from 'components/Common/MyForm'
import Profile from 'models/profile'

export interface ClientStepOneProps {
  state: [Profile, React.Dispatch<React.SetStateAction<Profile>>]
  onContinue: (profile: Profile) => Promise<void>
}

export const ClientStepOne: React.SFC<ClientStepOneProps> = ({
  state: [profile, setProfile],

  onContinue,
}) => {
  const ctx = useContext(GlobalContext)

  const history = useHistory()

  const formProps: MyFormProps<Profile> = {
    state: [profile, setProfile],
    onSubmit: onContinue,
  }

  return (
    <MyForm {...formProps}>
      {({ myInput, mySelect, myDateTimePicker, myButton }) => (
        <>
          {myInput({
            label: 'Firstname',
            value: profile.firstname,
            name: 'firstname',
          })}
          {myInput({
            label: 'Middlename',
            value: profile.middlename,
            name: 'middlename',
          })}
          {myInput({
            label: 'Lastname',
            value: profile.lastname,
            name: 'lastname',
          })}
          {myInput({
            label: 'Contact Number',
            value: profile.contact,
            name: 'contact',
          })}

          {myInput({
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
              {myButton('CONTINUE')}
            </Grid>
          </Grid>
        </>
      )}
    </MyForm>
  )
}

export default ClientStepOne
