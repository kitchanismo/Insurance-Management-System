import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import GlobalContext from 'contexts/globalContext'
import { MyForm, MyFormProps, InputProps } from 'components/Common/MyForm'
import Profile from 'models/profile'
import Client from 'models/client'
import { ClientStepOne } from './ClientStepOne'
import { ClientStepTwo } from './ClientStepTwo'

export interface NewClientProps {}

export const NewClient: React.SFC<NewClientProps> = () => {
  const ctx = useContext(GlobalContext)

  const history = useHistory()

  const [isNext, setIsNext] = React.useState(false)

  const [client, setClient] = React.useState<Profile>({
    firstname: '',
    middlename: '',
    lastname: '',
    address: '',
    contact: '',
    gender: null,
    civil: null,
    birthdate: null,
  })

  const toggleNext = () => {
    setIsNext((isNext) => !isNext)
  }

  const header = (title: string, subtitle: string) => {
    return (
      <Grid style={{ marginBottom: 20 }} container direction='column'>
        <Typography component='h6' variant='h6'>
          {title}
        </Typography>
        <Typography variant='subtitle1' color='textSecondary'>
          {subtitle}
        </Typography>
      </Grid>
    )
  }

  const onContinue = async (client: Client) => {
    console.log('this', client)
    setClient(client)
  }

  return (
    <>
      {!isNext && header('Step 1', 'Personal Details')}
      {isNext && header('Step 2', 'Plan Details')}
      {!isNext && (
        <ClientStepOne
          onContinue={onContinue}
          onNext={toggleNext}
          state={[client, setClient]}
        />
      )}
      {isNext && (
        <ClientStepTwo onBack={toggleNext} state={[client, setClient]} />
      )}
    </>
  )
}
