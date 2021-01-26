import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import GlobalContext from 'contexts/globalContext'
import { MyForm, MyFormProps, InputProps } from 'components/Common/MyForm'
import Client from 'models/client'

export interface ClientStepOneProps {
  onNext: () => void
  state: [Client, React.Dispatch<React.SetStateAction<Client>>]
  onContinue: (client: Client) => Promise<void>
}

export const ClientStepOne: React.SFC<ClientStepOneProps> = ({
  state: [client, setClient],
  onNext,
  onContinue,
}) => {
  const ctx = useContext(GlobalContext)

  const history = useHistory()

  const onSubmit = async (data: Client) => {
    await onContinue(data)
    ctx?.setAlert({ message: 'Successfully added', type: 'success' })
    onNext()
    return Promise.resolve()
  }

  const formProps: MyFormProps<Client> = {
    state: [client, setClient],
    onSubmit,
  }

  return (
    <MyForm {...formProps}>
      {({ myInput, mySelect, myDateTimePicker, myButton }) => (
        <>
          {myInput({
            label: 'Firstname',
            value: client.firstname,
            name: 'firstname',
          })}
          {myInput({
            label: 'Middlename',
            value: client.middlename,
            name: 'middlename',
          })}
          {myInput({
            label: 'Lastname',
            value: client.lastname,
            name: 'lastname',
          })}
          {myInput({
            label: 'Contact Number',
            value: client.contact,
            name: 'contact',
          })}

          {myInput({
            label: 'Address',
            value: client.address,
            name: 'address',
            isMultiline: true,
          })}
          {mySelect({
            label: 'Gender',
            value: client.gender,
            name: 'gender',
            options: ['Male', 'Female', 'Other'],
          })}
          {mySelect({
            label: 'Civil Status',
            value: client.civil,
            name: 'civil',
            options: ['Single', 'Married', 'Widowed'],
          })}

          {myDateTimePicker({
            label: 'Birthdate',
            value: client.birthdate,
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
