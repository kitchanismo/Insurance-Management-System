import React, { useEffect, useState, useContext } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import MyForm, { MyFormProps } from 'components/common/MyForm'
import Client from 'models/client'
import Commissioner from 'models/commissioner'
import Divider from '@material-ui/core/Divider'
import validator from 'validators/clientStepTwoValidator'
import { GlobalContext } from 'providers/GlobalProvider'
import { getEmployees } from 'services/employeeService'
import Employee from 'models/employee'

export interface ClientStepTwoProps {
  onBack: () => void
  onNext: (commissioner: Commissioner) => Promise<void>
  state: [Commissioner, React.Dispatch<React.SetStateAction<Commissioner>>]
  employees: Employee[]
}

export const ClientStepTwo: React.SFC<ClientStepTwoProps> = ({
  state: [commissioner, setCommissioner],
  onBack,
  onNext,
  employees,
}) => {
  const formProps: MyFormProps<Commissioner> = {
    state: [commissioner, setCommissioner],
    onSubmit: onNext,
    validator,
    radioButtonDefaultValue: commissioner.position,
  }

  const employeeOptions = (id: number) =>
    employees
      .filter((employee) => employee.position?.id === id)
      .map((employee) => ({
        value: employee.id,
        name: `${employee.profile?.lastname}, ${employee.profile?.firstname}`,
      }))

  return (
    <MyForm {...formProps}>
      {({ myRadio, mySelect, myButton }) => (
        <>
          <Grid
            style={{ paddingLeft: 10, marginTop: 5 }}
            spacing={2}
            container
            xs={12}
          >
            <>
              <Grid item xs={10}>
                {mySelect({
                  label: 'Branch Manager',
                  value: commissioner.branch_manager,
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
                  value: commissioner.agency_manager,
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
                  value: commissioner.supervisor,
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
                  value: commissioner.sales_agent,
                  name: 'sales_agent',
                  labelWidth: 85,
                  options: employeeOptions(4),
                })}
              </Grid>
              <Grid container item xs={2} justify='center' alignItems='center'>
                {myRadio({ value: 'sales_agent', name: 'position' })}
              </Grid>
            </>
          </Grid>

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
              {myButton('NEXT')}
            </Grid>
          </Grid>
        </>
      )}
    </MyForm>
  )
}
