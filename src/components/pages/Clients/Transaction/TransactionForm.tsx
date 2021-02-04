import React from 'react'
import Grid from '@material-ui/core/Grid'
import MyForm, { MyFormProps, RenderProps } from 'components/common/MyForm'
import Client from 'models/client'
import Commissioner from 'models/commissioner'
import validator from 'validators/clientTransactionValidator'
import Transaction from 'models/transaction'

export interface ClientStepTwoProps {
  onSubmit: (transaction: Transaction) => Promise<void>
  state: [
    Transaction,
    React.Dispatch<React.SetStateAction<Transaction & Client>>,
  ]
}

export const CommissionersForm: React.SFC<ClientStepTwoProps> = ({
  state: [transaction, setTransaction],
  onSubmit,
}) => {
  const formProps: MyFormProps<Transaction> = {
    state: [transaction, setTransaction],
    onSubmit,
    validator,
    radioButtonDefaultValue: transaction.position,
  }

  const labelMode =
    transaction.payment_mode !== 'Installment'
      ? transaction.payment_mode === 'Fullpayment'
        ? 'Balance'
        : 'Amount'
      : 'Amount'

  return (
    <MyForm {...formProps}>
      {({ myRadio, mySelect, myButton, myControlledInput, myInput }) => (
        <>
          <Grid
            style={{ paddingLeft: 10, marginTop: 5, marginBottom: 10 }}
            spacing={2}
            container
            xs={12}
          >
            {mySelect({
              label: 'Payment Mode',
              value: transaction.payment_mode,
              name: 'payment_mode',
              labelWidth: 110,
              options: [{ value: 'Installment' }, { value: 'Fullpayment' }],
            })}
            {myControlledInput({
              label: labelMode,
              value: transaction.amount,
              name: 'amount',
              onChange: (e: any) =>
                setTransaction({ ...transaction, amount: e.target.value }),
            })}
            {myInput({
              label: 'OR Number',
              value: transaction.or_number,
              name: 'or_number',
            })}

            <>
              <Grid item xs={10}>
                {mySelect({
                  label: 'Branch Manager',
                  value: transaction.branch_manager,
                  name: 'branch_manager',
                  labelWidth: 120,
                  options: [
                    { value: 1, name: 'John Doe' },
                    { value: 2, name: 'John Smith' },
                  ],
                })}
              </Grid>
              <Grid container item xs={2} justify='center' alignItems='center'>
                {myRadio({ value: 'branch_manager', name: 'position' })}
              </Grid>
            </>
            <>
              <Grid item xs={10}>
                {mySelect({
                  label: 'Agency Manager',
                  value: transaction.agency_manager,
                  name: 'agency_manager',
                  labelWidth: 120,
                  options: [
                    { value: 3, name: 'John Joe' },
                    { value: 4, name: 'John Witch' },
                  ],
                })}
              </Grid>
              <Grid container item xs={2} justify='center' alignItems='center'>
                {myRadio({ value: 'agency_manager', name: 'position' })}
              </Grid>
            </>
            <>
              <Grid item xs={10}>
                {mySelect({
                  label: 'Supervisor',
                  value: transaction.supervisor,
                  name: 'supervisor',
                  labelWidth: 80,
                  options: [
                    { value: 5, name: 'John Doex' },
                    { value: 6, name: 'John Smithx' },
                  ],
                })}
              </Grid>
              <Grid container item xs={2} justify='center' alignItems='center'>
                {myRadio({ value: 'supervisor', name: 'position' })}
              </Grid>
            </>

            <>
              <Grid item xs={10}>
                {mySelect({
                  label: 'Sales Agent',
                  value: transaction.sales_agent,
                  name: 'sales_agent',
                  labelWidth: 85,
                  options: [
                    { value: 7, name: 'John Doex' },
                    { value: 8, name: 'John Smithc' },
                  ],
                })}
              </Grid>
              <Grid container item xs={2} justify='center' alignItems='center'>
                {myRadio({ value: 'sales_agent', name: 'position' })}
              </Grid>
            </>
          </Grid>
          {myButton()}
        </>
      )}
    </MyForm>
  )
}

export default CommissionersForm
