import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import GlobalContext from 'contexts/globalContext'
import Profile from 'models/profile'
import Client from 'models/client'
import Commissioner from 'models/commissioner'
import { ClientStepOne } from './ClientStepOne'
import { ClientStepTwo } from './ClientStepTwo'
import {
  MyStepper,
  useStepper,
  MyStepperProps,
} from 'components/Common/MyStepper'
import { ClientStepThree } from './ClientStepThree'
import { SettingsCellOutlined } from '@material-ui/icons'

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

  const [commissioner, setCommissioner] = React.useState<Commissioner>({
    position: 'sales_agent',
  })

  const [client, setClient] = React.useState<Client>({})

  const onNextOne = async (profile: Profile) => {
    console.log('profile', profile)
    setProfile(profile)
    stepper.handleNext()
  }

  const onNextTwo = async (commissioner: Commissioner) => {
    const insured_employee = commissioner[commissioner.position] ?? ''

    if (!insured_employee) {
      ctx?.setAlert({
        message: 'Sales Agent is not present! Please select another employee.',
        type: 'error',
      })
      return
    }

    setClient((client) => ({ ...client, insured_employee }))

    setCommissioner(commissioner)

    stepper.handleNext()

    console.log(commissioner)
  }

  const onNextThree = async (client: Client) => {
    setClient(client)

    stepper.handleNext()

    console.log({
      client: { ...profile, ...client },
      commissioner,
    })
  }

  return (
    <>
      <MyStepper {...stepper} />
      {stepper.activeStep === 0 && (
        <ClientStepOne onNext={onNextOne} state={[profile, setProfile]} />
      )}
      {stepper.activeStep === 1 && (
        <ClientStepTwo
          onBack={() => stepper.handleBack()}
          onNext={onNextTwo}
          state={[commissioner, setCommissioner]}
        />
      )}
      {stepper.activeStep === 2 && (
        <ClientStepThree
          onBack={() => stepper.handleBack()}
          onNext={onNextThree}
          state={[client, setClient]}
        />
      )}
    </>
  )
}
