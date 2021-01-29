import React from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { MyForm, MyFormProps } from 'components/Common/MyForm'
import Client from 'models/client'
import Commissioner from 'models/commissioner'
import validator from 'validators/clientStepThreeValidator'

export interface ClientStepTwoProps {
  onBack: () => void
  onNext: (client: Client) => Promise<void>
  state: [Client, React.Dispatch<React.SetStateAction<Client>>]
}

export const ClientStepThree: React.SFC<ClientStepTwoProps> = ({
  state: [client, setClient],
  onBack,
  onNext,
}) => {
  const formProps: MyFormProps<Client> = {
    state: [client, setClient],
    onSubmit: onNext,
    validator,
  }

  return (
    <MyForm {...formProps}>
      {({ myInput, mySelect, myButton }) => (
        <>
          {mySelect({
            label: 'Plan',
            value: client.plan,
            name: 'plan',
            labelWidth: 30,
            options: [
              { value: 'Plan 1' },
              { value: 'Plan 2' },
              { value: 'Plan 3' },
              { value: 'Plan 4' },
              { value: 'Plan 5' },
              { value: 'Plan 6' },
              { value: 'Plan 7' },
              { value: 'Plan 8' },
            ],
          })}
          {mySelect({
            label: 'Payment Mode',
            value: client.payment_mode,
            name: 'payment_mode',
            labelWidth: 110,
            options: [{ value: 'Installment' }, { value: 'Fullpayment' }],
          })}

          {client.payment_mode && client.plan && (
            <>
              {client.payment_mode === 'Installment' &&
                mySelect({
                  label: 'Payment Period',
                  value: client.payment_period,
                  name: 'payment_period',
                  labelWidth: 120,
                  options: [
                    { value: 'Monthly' },
                    { value: 'Quarterly' },
                    { value: 'Semi-Annually' },
                    { value: 'Annually' },
                  ],
                })}

              <Grid
                xs={12}
                style={{
                  marginBottom: 10,
                  marginTop: 10,
                  paddingRight: 8,
                  paddingLeft: 8,
                }}
                direction='column'
              >
                {myInput({
                  label: 'OR Number',
                  name: 'or_number',
                })}
              </Grid>

              <Grid style={{ paddingLeft: 10 }} direction='column'>
                {client.payment_period &&
                  client.payment_mode === 'Installment' && (
                    <>
                      <Typography component='h6' variant='subtitle1'>
                        Downpayment
                      </Typography>
                      <Typography color='primary' variant='subtitle1'>
                        Php 388.00
                      </Typography>
                    </>
                  )}
                {client.payment_mode === 'Fullpayment' && (
                  <>
                    <Typography component='h6' variant='subtitle1'>
                      Lumpsum Price
                    </Typography>
                    <Typography color='primary' variant='subtitle1'>
                      Php 23,280.00
                    </Typography>
                  </>
                )}
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
              {myButton('PAY')}
            </Grid>
          </Grid>
        </>
      )}
    </MyForm>
  )
}
