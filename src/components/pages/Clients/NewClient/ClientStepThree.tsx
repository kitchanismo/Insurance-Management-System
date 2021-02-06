import { useContext, useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import MyForm, { MyFormProps, OptionProps } from 'components/common/MyForm'
import Client from 'models/client'
import Commissioner from 'models/commissioner'
import validator from 'validators/clientStepThreeValidator'
import { getAmountToPay } from 'api/clientService'
import { ClientContext } from 'providers/ClientProvider'
import Payment from 'models/payment'

export interface ClientStepTwoProps {
  onBack: () => void
  onNext: (client: Client & Payment) => Promise<void>
  state: [
    Client & Payment,
    React.Dispatch<React.SetStateAction<Client & Payment>>,
  ]
}

export const ClientStepThree: React.SFC<ClientStepTwoProps> = ({
  state: [client, setClient],
  onBack,
  onNext,
}) => {
  const [clientState, clientDispatch] = useContext(ClientContext)!
  const [planOptions, setPlanOptions] = useState<OptionProps[] | []>([])

  useEffect(() => {
    if (client.payment_mode && client.plan) {
      setClient((client) => ({
        ...client,
        amount: getAmountToPay(client, clientState.plans) ?? 0,
      }))
    }
  }, [client.payment_mode, client.payment_period, client.plan])

  useEffect(() => {
    const options: OptionProps[] = clientState.plans.map((plan) => ({
      value: plan.plan,
    }))
    setPlanOptions(options)
  }, [clientState.plans])

  const formProps: MyFormProps<Client & Payment> = {
    state: [client, setClient],
    onSubmit: onNext,
    validator,
  }

  return (
    <MyForm {...formProps}>
      {({ myControlledInput, myInput, mySelect, myButton }) => (
        <>
          {mySelect({
            label: 'Plan',
            value: client.plan,
            name: 'plan',
            labelWidth: 30,
            options: planOptions,
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
                spacing={1}
                style={{
                  marginBottom: 10,
                  marginTop: 5,
                  paddingLeft: 8,
                }}
                container
              >
                {myControlledInput({
                  label: 'Amount',
                  name: 'amount',
                  value: client.amount,
                })}
                <Grid style={{ marginTop: 10 }} xs={12} item>
                  {myInput({
                    label: 'OR Number',
                    name: 'or_number',
                  })}
                </Grid>
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
