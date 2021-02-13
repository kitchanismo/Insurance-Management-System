import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import MyForm, { MyFormProps, RenderProps } from 'components/common/MyForm'
import Client from 'models/client'
import Commissioner from 'models/commissioner'
import validator from 'validators/clientTransactionValidator'
import Transaction from 'models/transaction'
import Employee from 'models/employee'

export interface ClientStepTwoProps {
  onSubmit: (transaction: Transaction) => Promise<void>
  state: [
    Transaction,
    React.Dispatch<React.SetStateAction<Transaction & Client>>,
  ]
  employees: Employee[]
}

export const CommissionersForm: React.SFC<ClientStepTwoProps> = ({
  state: [transaction, setTransaction],
  onSubmit,
  employees,
}) => {
  const formProps: MyFormProps<Transaction> = {
    state: [transaction, setTransaction],
    onSubmit,
    validator,
    radioButtonDefaultValue: transaction.position,
  }

  const employeeOptions = (id: number) =>
    employees
      .filter((employee) => employee.position?.id === id)
      .map((employee) => ({
        value: employee.id,
        name: `${employee.profile?.lastname}, ${employee.profile?.firstname}`,
      }))

  const labelMode =
    transaction.payment_mode !== 'Installment'
      ? transaction.payment_mode === 'Fullpayment'
        ? 'Balance'
        : 'Amount'
      : 'Amount'

  return (
    <MyForm {...formProps}>
      {({
        myRadio,
        mySelect,
        myButton,
        myControlledInput,
        myInput,
        myDateTimePicker,
      }) => (
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
                  options: employeeOptions(1),
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
                  options: employeeOptions(2),
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
                  options: employeeOptions(3),
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
                  options: employeeOptions(4),
                })}
              </Grid>
              <Grid container item xs={2} justify='center' alignItems='center'>
                {myRadio({ value: 'sales_agent', name: 'position' })}
              </Grid>
            </>
            {myDateTimePicker({
              label: 'Insure Date',
              value: transaction.created_at,
              name: 'created_at',
            })}
            {myButton()}
          </Grid>
        </>
      )}
    </MyForm>
  )
}

export default CommissionersForm
