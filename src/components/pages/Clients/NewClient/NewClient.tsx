import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import GlobalContext from 'contexts/globalContext'
import { MyForm, MyFormProps, InputProps } from 'components/Common/MyForm'
import Profile from 'models/profile'
import Client from 'models/client'
import Payment from 'models/payment'
import { ClientStepOne } from './ClientStepOne'
import { ClientStepTwo } from './ClientStepTwo'

export interface NewClientProps {}

export const NewClient: React.SFC<NewClientProps> = () => {
  const ctx = useContext(GlobalContext)

  const history = useHistory()

  const [isNext, setIsNext] = React.useState(false)

  const [profile, setProfile] = React.useState<Profile>({})

  const [transaction, setTransaction] = React.useState<Client & Payment>({
    position: 'sales_agent',
  })

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

  const onContinue = async (profile: Profile) => {
    console.log('profile', profile)
    setProfile(profile)
    setIsNext((isNext) => !isNext)
  }

  const onSubmit = async (transaction: Client & Payment) => {
    const insured_employee = transaction[transaction.position] ?? ''

    const data: Client & Payment = { ...transaction, insured_employee }

    setTransaction(data)

    console.log(data)
  }

  return (
    <>
      {!isNext && header('Step 1', 'Personal Details')}
      {isNext && header('Step 2', 'Plan Details')}
      {!isNext && (
        <ClientStepOne onContinue={onContinue} state={[profile, setProfile]} />
      )}
      {isNext && (
        <ClientStepTwo
          onBack={() => setIsNext((isNext) => !isNext)}
          onSubmit={onSubmit}
          state={[transaction, setTransaction]}
        />
      )}
    </>
  )
}
