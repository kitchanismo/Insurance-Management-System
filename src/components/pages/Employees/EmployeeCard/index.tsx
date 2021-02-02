import React from 'react'
import { useHistory } from 'react-router-dom'

import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import ViewIcon from '@material-ui/icons/RemoveRedEye'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Chip from '@material-ui/core/Chip'

import MyCard from 'components/common/MyCard'
import MyAvatar from 'components/common/MyAvatar'
import Employee from 'models/employee'
import { capitalize } from 'utils/helper'

export interface EmployeesProps {
  employee: Partial<Employee>
}

const EmployeeCard: React.SFC<EmployeesProps> = ({ employee }) => {
  const history = useHistory()

  return (
    <MyCard title={employee.firstname} style={{ paddingBottom: 5 }}>
      <CardContent>
        <Grid container xs={12} justify='space-between'>
          <Grid
            style={{ paddingLeft: 10 }}
            container
            item
            direction='column'
            xs={7}
            justify='flex-start'
          >
            <Typography component='h3' variant='h6'>
              {`${employee.lastname}, ${employee.firstname} ${employee.middlename}`}
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
              {employee.position}
            </Typography>

            <Grid item xs={1}>
              <Chip
                style={{ marginTop: 5 }}
                size='small'
                label={employee.status}
                variant='default'
                color={
                  employee.status !== 'active'
                    ? employee.status === 'deactive'
                      ? 'secondary'
                      : 'default'
                    : 'primary'
                }
              />
            </Grid>
          </Grid>
          <Grid container item xs={5} justify='center' alignItems='center'>
            <MyAvatar
              text={
                capitalize(employee.lastname!) + capitalize(employee.firstname!)
              }
              onClick={() => history.push('/employees/' + employee.id)}
            />
          </Grid>
        </Grid>
      </CardContent>

      <Divider style={{ marginLeft: 20, marginRight: 20 }}></Divider>
      <Grid container xs={12} justify='space-evenly'>
        <IconButton
          onClick={() => history.push('/employees/' + employee.id)}
          aria-label='view'
        >
          <ViewIcon />
        </IconButton>
        <IconButton
          onClick={() => history.push('/employees/edit/' + employee.id)}
          aria-label='edit'
        >
          <EditIcon />
        </IconButton>
        <IconButton aria-label='archive'>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </MyCard>
  )
}

export default EmployeeCard
