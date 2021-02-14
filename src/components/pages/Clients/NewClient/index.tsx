import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Profile from 'models/profile'
import Client from 'models/client'
import Commissioner from 'models/commissioner'
import { ClientStepOne } from './ClientStepOne'
import { ClientStepTwo } from './ClientStepTwo'
import MyStepper, { useStepper } from 'components/common/MyStepper'
import { ClientStepThree } from './ClientStepThree'
import Scroll from 'react-scroll'
import { GlobalContext } from 'providers/GlobalProvider'
import Payment from 'models/payment'
import { postImage } from 'services/imageService'
import { saveClient } from 'services/clientService'
import { getEmployees } from 'services/employeeService'
import Employee from 'models/employee'

export interface NewClientProps {}

const NewClient: React.SFC<NewClientProps> = () => {
  const [globalState, globalDispatch] = useContext(GlobalContext)!

  const scroll = Scroll.animateScroll

  const [employees, setEmployees] = useState<Employee[]>([])

  useEffect(() => {
    globalDispatch({ type: 'SET_TITLE', payload: 'Client Registration' })
    scroll.scrollToTop({ duration: 500 })
    getEmployees().then((employees) => setEmployees(employees))
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

  const [client, setClient] = React.useState<Client & Payment>({
    years_to_pay: 5,
    created_at: new Date(Date.now()),
  })

  const onNextOne = async (profile: Profile) => {
    scroll.scrollToTop({ duration: 500 })
    console.log('profile', profile)
    setProfile(profile)
    stepper.handleNext()
  }

  const onNextTwo = async (commissioner: Commissioner) => {
    const insured_employee = commissioner[commissioner.position] ?? 0

    if (!insured_employee) {
      globalDispatch({
        type: 'SET_ALERT',
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

  const onNextThree = async (client: Client & Payment) => {
    scroll.scrollToTop({ duration: 500 })

    const transaction = {
      ...profile,
      ...client,
      ...commissioner,
      branch: getBranchId(+commissioner?.branch_manager!),
    }

    return postImage(transaction?.image!, (image_url: string) => {
      transaction.image_url = image_url
      delete transaction.image

      return saveClient(transaction)
        .then(() => {
          globalDispatch({
            type: 'SET_ALERT',
            payload: { message: 'Successfully added', type: 'success' },
          })
          globalDispatch({ type: 'SET_IS_LOADING', payload: false })
          stepper.handleNext()
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

  const getBranchId = (employeeId: number) => {
    return employees.filter((employee) => employee.id === employeeId)[0].branch
      ?.id
  }

  const onAddNew = () => {
    stepper.handleReset()
    setProfile({})
    setCommissioner({
      position: 'sales_agent',
    })
    setClient({
      years_to_pay: 5,
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
          employees={employees}
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
                style={{ marginTop: 10 }}
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
                style={{ marginTop: 10 }}
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
