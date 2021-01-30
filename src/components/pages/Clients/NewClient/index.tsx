import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Profile from 'models/profile'
import Client from 'models/client'
import Commissioner from 'models/commissioner'
import { ClientStepOne } from './ClientStepOne'
import { ClientStepTwo } from './ClientStepTwo'
import MyStepper, { useStepper } from 'components/common/Stepper'
import { ClientStepThree } from './ClientStepThree'
import Scroll from 'react-scroll'
import { GlobalContext } from 'hooks/useGlobalState'

export interface NewClientProps {}

const NewClient: React.SFC<NewClientProps> = () => {
  const [state, dispatch] = useContext(GlobalContext)!

  const scroll = Scroll.animateScroll

  useEffect(() => {
    dispatch({ type: 'setTitle', payload: 'Client Registration' })
    scroll.scrollToTop({ duration: 500 })
  }, [])

  const history = useHistory()

  const stepper = useStepper([
    'Create Profile Account',
    'Select All Commissioners',
    'Select Plan And Payment',
  ])

  const [profile, setProfile] = React.useState<Profile>({})

  const [commissioner, setCommissioner] = React.useState<Commissioner>({
    position: 'sales_agent',
  })

  const [client, setClient] = React.useState<Client>({})

  const onNextOne = async (profile: Profile) => {
    scroll.scrollToTop({ duration: 500 })
    console.log('profile', profile)
    setProfile(profile)
    stepper.handleNext()
  }

  const onNextTwo = async (commissioner: Commissioner) => {
    const insured_employee = commissioner[commissioner.position] ?? ''

    if (!insured_employee) {
      dispatch({
        type: 'setAlert',
        payload: {
          message:
            'Sales Agent is not present! Please select another employee.',
          type: 'error',
        },
      })

      return
    }

    scroll.scrollToTop({ duration: 500 })

    setClient((client) => ({ ...client, insured_employee }))

    setCommissioner(commissioner)

    stepper.handleNext()

    console.log(commissioner)
  }

  const onNextThree = async (client: Client) => {
    scroll.scrollToTop({ duration: 500 })

    setClient(client)

    stepper.handleNext()

    console.log({
      client: { ...profile, ...client },
      commissioner,
    })
  }

  const onAddNew = () => {
    stepper.handleReset()
    setProfile({})
    setCommissioner({
      position: 'sales_agent',
    })
    setClient({})
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

      {stepper.activeStep === 3 && (
        <Grid container xs={12} direction='column' alignItems='center'>
          <Typography component='h6' variant='subtitle1'>
            All Step Completed!
          </Typography>
          <Grid spacing={2} item container xs={12}>
            <Grid item xs={6}>
              <Button
                onClick={() => history.replace('/clients')}
                style={{ paddingTop: 15, paddingBottom: 15, marginTop: 10 }}
                fullWidth
                variant='contained'
                color='default'
              >
                CLIENT LIST
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={onAddNew}
                style={{ paddingTop: 15, paddingBottom: 15, marginTop: 10 }}
                fullWidth
                variant='contained'
                color='primary'
              >
                ADD NEW
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default NewClient
