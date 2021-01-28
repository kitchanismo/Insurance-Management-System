import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import GlobalContext from 'contexts/globalContext'
import Profile from 'models/profile'
import Client from 'models/client'
import Payment from 'models/payment'
import { ClientStepOne } from './ClientStepOne'
import { ClientStepTwo } from './ClientStepTwo'
import {
  MyStepper,
  useStepper,
  MyStepperProps,
} from 'components/Common/MyStepper'

export interface NewClientProps {}

export const NewClient: React.SFC<NewClientProps> = () => {
  const ctx = useContext(GlobalContext)

  const stepper = useStepper([
    'CREATE PROFILE',
    'SELECT COMMISSIONERS',
    'SELECT A PLAN',
  ])

  const [profile, setProfile] = React.useState<Profile>({
    firstname: 'dfdfd',
    middlename: 'sddfdf',
    lastname: 'dfdgfgf',
    civil: 'Single',
  })

  const [transaction, setTransaction] = React.useState<Client & Payment>({
    position: 'sales_agent',
  })

  const onContinue = async (profile: Profile) => {
    console.log('profile', profile)
    setProfile(profile)
    stepper.handleNext()
  }

  const onSubmit = async (transaction: Client & Payment) => {
    const insured_employee = transaction[transaction.position] ?? ''

    if (!insured_employee) {
      ctx?.setAlert({
        message: 'Sales Agent is not present! Please select another employee.',
        type: 'error',
      })
      return
    }

    const data: Client & Payment = { ...transaction, insured_employee }

    setTransaction(data)

    console.log(data)
  }

  return (
    <>
      <MyStepper {...stepper} />
      {stepper.activeStep === 0 && (
        <ClientStepOne onContinue={onContinue} state={[profile, setProfile]} />
      )}
      {stepper.activeStep === 1 && (
        <ClientStepTwo
          onBack={() => stepper.handleBack()}
          onSubmit={onSubmit}
          state={[transaction, setTransaction]}
        />
      )}
    </>
  )
}
