import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import MyForm, { MyFormProps } from 'components/Common/MyForm'
import Profile from 'models/profile'
import validator from 'validators/saveProfileValidator'

export interface ClientStepOneProps {
  state: [Profile, React.Dispatch<React.SetStateAction<Profile>>]
  onNext: (profile: Profile) => Promise<void>
}

export const ClientStepOne: React.SFC<ClientStepOneProps> = ({
  state: [profile, setProfile],
  onNext,
}) => {
  const history = useHistory()

  const formProps: MyFormProps<Profile> = {
    state: [profile, setProfile],
    onSubmit: onNext,
    validator,
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
              {myButton('NEXT')}
            </Grid>
          </Grid>
        </>
      )}
    </MyForm>
  )
}

export default ClientStepOne
