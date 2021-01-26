import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import GlobalContext from 'contexts/globalContext'
import { MyForm, MyFormProps, InputProps } from 'components/Common/MyForm'
import Client from 'models/client'
import Employee from 'models/employee'
import Payment from 'models/payment'
import Divider from '@material-ui/core/Divider'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'

export interface ClientStepTwoProps {
  onBack: () => void
  state: [Client, React.Dispatch<React.SetStateAction<Client>>]
}

export const ClientStepTwo: React.SFC<ClientStepTwoProps> = ({
  state: [client, setClient],
  onBack,
}) => {
  const ctx = useContext(GlobalContext)

  const [selectedValue, setSelectedValue] = React.useState('')

  const [payment, setPayment] = useState<Payment>()

  const formData: Client & Payment = { ...payment, ...client }

  const onSubmit = async (data: Client & Payment) => {
    ctx?.setAlert({ message: 'Successfully added', type: 'success' })
    return Promise.resolve()
  }

  const formProps: MyFormProps<Client & Payment> = {
    state: [formData, setClient],
    onSubmit,
  }

  const onChangeRadio = (e: any) => {
    setSelectedValue(e.target.value)
  }
  return (
    <MyForm {...formProps}>
      {({ myInput, mySelect, myButton }) => (
        <>
          {mySelect({
            label: 'Plan',
            value: formData.plan,
            name: 'plan',
            options: [
              'Plan 1',
              'Plan 2',
              'Plan 3',
              'Plan 4',
              'Plan 5',
              'Plan 6',
              'Plan 7',
              'Plan 8',
            ],
          })}
          {mySelect({
            label: 'Payment Mode',
            value: formData.payment_mode,
            name: 'payment_mode',
            options: ['Installment', 'Fullpayment'],
          })}

          {formData.payment_mode && formData.plan && (
            <>
              {formData.payment_mode === 'Installment' &&
                mySelect({
                  label: 'Payment Period',
                  value: formData.payment_period,
                  name: 'payment_period',
                  options: [
                    'Monthly',
                    'Quarterly',
                    'Semi-Annually',
                    'Annually',
                  ],
                })}

              <Grid style={{ paddingLeft: 15 }} direction='column'>
                <Typography component='h6' variant='subtitle1'>
                  {client.payment_mode === 'Installment'
                    ? 'Downpayment'
                    : 'Lumpsum Price'}
                </Typography>
                <Typography color='error' variant='subtitle1'>
                  {client.payment_mode === 'Installment'
                    ? 'Php 388.00'
                    : 'Php 23,280.00'}
                </Typography>
                <Divider
                  style={{ marginRight: 15, marginTop: 10, marginBottom: 10 }}
                ></Divider>
                <Typography
                  style={{ marginBottom: 10 }}
                  component='h6'
                  variant='h6'
                >
                  TEAM
                </Typography>
              </Grid>
              <Grid style={{ paddingLeft: 10 }} spacing={2} container xs={12}>
                <>
                  <Grid item xs={10}>
                    {mySelect({
                      label: 'Branch Manager',
                      value: formData.branch_manager,
                      name: 'branch_manager',
                      options: ['John Smith', 'Juan Dela Cruz'],
                    })}
                  </Grid>
                  <Grid
                    container
                    item
                    xs={2}
                    justify='center'
                    alignItems='center'
                  >
                    <Radio
                      checked={selectedValue === 'bm'}
                      onChange={onChangeRadio}
                      value='bm'
                      name='radio-button-demo'
                      inputProps={{ 'aria-label': 'Branch Manager' }}
                    />
                  </Grid>
                </>
                <>
                  <Grid item xs={10}>
                    {mySelect({
                      label: 'Agency Manager',
                      value: formData.agency_manager,
                      name: 'agency_manager',
                      options: ['John Smith', 'Juan Dela Cruz'],
                    })}
                  </Grid>
                  <Grid
                    container
                    item
                    xs={2}
                    justify='center'
                    alignItems='center'
                  >
                    <Radio
                      checked={selectedValue === 'am'}
                      onChange={onChangeRadio}
                      value='am'
                      name='radio-button-demo'
                      inputProps={{ 'aria-label': 'Agency Manager' }}
                    />
                  </Grid>
                </>
                <>
                  <Grid item xs={10}>
                    {mySelect({
                      label: 'Supervisor',
                      value: formData.supervisor,
                      name: 'supervisor',
                      options: ['John Smith', 'Juan Dela Cruz'],
                    })}
                  </Grid>
                  <Grid
                    container
                    item
                    xs={2}
                    justify='center'
                    alignItems='center'
                  >
                    <Radio
                      checked={selectedValue === 'sv'}
                      onChange={onChangeRadio}
                      value='sv'
                      name='radio-button-demo'
                      inputProps={{ 'aria-label': 'Supervisor' }}
                    />
                  </Grid>
                </>

                <>
                  <Grid item xs={10}>
                    {mySelect({
                      label: 'Sales Agent',
                      value: formData.sales_agent,
                      name: 'sales_agent',
                      options: ['John Smith', 'Juan Dela Cruz'],
                    })}
                  </Grid>
                  <Grid
                    container
                    item
                    xs={2}
                    justify='center'
                    alignItems='center'
                  >
                    <Radio
                      checked={selectedValue === 'sa'}
                      onChange={onChangeRadio}
                      value='sa'
                      name='radio-button-demo'
                      inputProps={{ 'aria-label': 'Sales Agent' }}
                    />
                  </Grid>
                </>
              </Grid>
            </>
          )}

          <Grid
            style={{ paddingLeft: 18, paddingTop: 15, paddingBottom: 15 }}
            container
            xs={12}
            justify='center'
            spacing={2}
          >
            <Grid item xs={6}>
              <Button
                onClick={() => onBack()}
                style={{ paddingTop: 15, paddingBottom: 15 }}
                fullWidth
                variant='contained'
                color='default'
              >
                BACK
              </Button>
            </Grid>
            <Grid item xs={6}>
              {myButton('SUBMIT')}
            </Grid>
          </Grid>
        </>
      )}
    </MyForm>
  )
}
