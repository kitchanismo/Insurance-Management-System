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
import userIcon from 'assets/profile-user.svg'

import { MyCard } from 'components/Common/MyCard'
import Employee from 'models/employee'

export interface EmployeesProps {
  employee: Partial<Employee>
}

export const EmployeeCard: React.SFC<EmployeesProps> = ({ employee }) => {
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
            <Typography component='h6' variant='h6'>
              {`${employee.lastname}, ${employee.firstname} ${employee.middlename}`}
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
              {employee.position}
            </Typography>

            <Grid item xs={1}>
              <Chip
                style={{ marginTop: 5 }}
                size='small'
                label={employee.is_active ? 'Active' : 'Deactivate'}
                variant='default'
                color={employee.is_active ? 'primary' : 'secondary'}
              />
            </Grid>
          </Grid>
          <Grid container item xs={5} justify='center' alignItems='center'>
            <IconButton
              onClick={() => history.push('/employees/' + employee.id)}
              aria-label='play/pause'
            >
              <img style={{ width: 100 }} src={userIcon} alt='User Logo' />
            </IconButton>
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