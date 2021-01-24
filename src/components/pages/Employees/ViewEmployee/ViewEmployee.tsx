import React, { useState, useEffect, useContext } from 'react'
import GlobalContext from 'contexts/globalContext'
import { useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'
import userIcon from 'assets/profile-user.svg'

import { MyCard } from 'components/Common/MyCard'
import Employee from 'models/employee'

export interface ViewUserProps {
  title: string
}

export const ViewEmployee: React.SFC<ViewUserProps> = (props) => {
  const ctx = useContext(GlobalContext)

  useEffect(() => {
    ctx?.setTitle('View Employee')
  }, [])

  const history = useHistory()
  const [employee, setEmployee] = useState<Partial<Employee> | null>(null)

  useEffect(() => {
    setEmployee({
      id: 1,
      firstname: 'Firstname',
      middlename: 'Middlename',
      lastname: 'Lastname',
      position: 'Branch Manager',
      civil: 'Single',
      gender: 'Male',
      address: 'Somewhere ssdsdsd sdfdfdfdf sfdfdff',
      contact: '09234545866',
      status: 'active',
    })
  }, [])

  const info = (title: string, subtitle: any) => (
    <Grid container alignItems='center' direction='column' item xs={6}>
      <Typography component='h6' variant='h6'>
        {title}
      </Typography>
      <Typography variant='subtitle1' color='textSecondary'>
        {subtitle}
      </Typography>
    </Grid>
  )

  return (
    <Grid container xs={12}>
      {employee && (
        <MyCard
          title='Personal Details'
          endIcon={
            <EditIcon
              style={{ color: 'white', marginTop: 5 }}
              onClick={() => history.push('/employees/edit/' + employee.id)}
            />
          }
        >
          <CardContent>
            <Grid container xs={12} justify='space-between'>
              <Grid
                style={{ paddingLeft: 10 }}
                container
                direction='column'
                item
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
                    label={employee.status}
                    variant='default'
                    color={
                      employee.status !== 'active' ? 'secondary' : 'primary'
                    }
                  />
                </Grid>
              </Grid>
              <Grid container item xs={5} justify='center' alignItems='center'>
                <IconButton aria-label='play/pause'>
                  <img style={{ width: 100 }} src={userIcon} alt='User Logo' />
                </IconButton>
              </Grid>
            </Grid>
          </CardContent>
          <Divider style={{ marginLeft: 20, marginRight: 20 }}></Divider>
          <CardContent>
            <Grid spacing={1} container xs={12} style={{ paddingLeft: 10 }}>
              {info('Gender', employee.gender)}
              {info('Civil Status', employee.civil)}
              {info('Contact', employee.contact)}
              {info('Birthdate', employee.birthdate || 'N/A')}
              {
                <Grid
                  container
                  alignItems='center'
                  direction='column'
                  item
                  xs={12}
                >
                  <Typography component='h6' variant='h6'>
                    Address
                  </Typography>
                  <Typography variant='subtitle1' color='textSecondary'>
                    {employee.address}
                  </Typography>
                </Grid>
              }
            </Grid>
          </CardContent>
        </MyCard>
      )}
    </Grid>
  )
}
