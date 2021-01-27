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
  onSubmit: (transaction: Client & Payment) => Promise<void>
  state: [
    Client & Payment,
    React.Dispatch<React.SetStateAction<Client & Payment>>,
  ]
}

export const ClientStepTwo: React.SFC<ClientStepTwoProps> = ({
  state: [transaction, setTransaction],
  onBack,
  onSubmit,
}) => {
  const formProps: MyFormProps<Client & Payment> = {
    state: [transaction, setTransaction],
    onSubmit,
    radioButtonDefaultValue: transaction.position,
  }

  return (
    <MyForm {...formProps}>
      {({ myRadio, mySelect, myButton }) => (
        <>
          {mySelect({
            label: 'Plan',
            value: transaction.plan,
            name: 'plan',
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
            value: transaction.payment_mode,
            name: 'payment_mode',
            options: [{ value: 'Installment' }, { value: 'Fullpayment' }],
          })}

          {transaction.payment_mode && transaction.plan && (
            <>
              {transaction.payment_mode === 'Installment' &&
                mySelect({
                  label: 'Payment Period',
                  value: transaction.payment_period,
                  name: 'payment_period',
                  options: [
                    { value: 'Monthly' },
                    { value: 'Quarterly' },
                    { value: 'Semi-Annually' },
                    { value: 'Annually' },
                  ],
                })}

              <Grid style={{ paddingLeft: 15 }} direction='column'>
                {transaction.payment_period && (
                  <>
                    <Typography component='h6' variant='subtitle1'>
                      {transaction.payment_mode === 'Installment'
                        ? 'Downpayment'
                        : 'Lumpsum Price'}
                    </Typography>
                    <Typography color='error' variant='subtitle1'>
                      {transaction.payment_mode === 'Installment'
                        ? 'Php 388.00'
                        : 'Php 23,280.00'}
                    </Typography>
                  </>
                )}
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
                      value: transaction.branch_manager,
                      name: 'branch_manager',
                      options: [
                        { value: 1, name: 'John Doe' },
                        { value: 2, name: 'John Smith' },
                      ],
                    })}
                  </Grid>
                  <Grid
                    container
                    item
                    xs={2}
                    justify='center'
                    alignItems='center'
                  >
                    {myRadio({ value: 'branch_manager', name: 'position' })}
                  </Grid>
                </>
                <>
                  <Grid item xs={10}>
                    {mySelect({
                      label: 'Agency Manager',
                      value: transaction.agency_manager,
                      name: 'agency_manager',
                      options: [
                        { value: 3, name: 'John Joe' },
                        { value: 4, name: 'John Witch' },
                      ],
                    })}
                  </Grid>
                  <Grid
                    container
                    item
                    xs={2}
                    justify='center'
                    alignItems='center'
                  >
                    {myRadio({ value: 'agency_manager', name: 'position' })}
                  </Grid>
                </>
                <>
                  <Grid item xs={10}>
                    {mySelect({
                      label: 'Supervisor',
                      value: transaction.supervisor,
                      name: 'supervisor',
                      options: [
                        { value: 5, name: 'John Doex' },
                        { value: 6, name: 'John Smithx' },
                      ],
                    })}
                  </Grid>
                  <Grid
                    container
                    item
                    xs={2}
                    justify='center'
                    alignItems='center'
                  >
                    {myRadio({ value: 'supervisor', name: 'position' })}
                  </Grid>
                </>

                <>
                  <Grid item xs={10}>
                    {mySelect({
                      label: 'Sales Agent',
                      value: transaction.sales_agent,
                      name: 'sales_agent',
                      options: [
                        { value: 7, name: 'John Doex' },
                        { value: 8, name: 'John Smithc' },
                      ],
                    })}
                  </Grid>
                  <Grid
                    container
                    item
                    xs={2}
                    justify='center'
                    alignItems='center'
                  >
                    {myRadio({ value: 'sales_agent', name: 'position' })}
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
