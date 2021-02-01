import React, { useState, useEffect, useContext } from 'react'
import Link from '@material-ui/core/Link'
import { useHistory } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import Chip from '@material-ui/core/Chip'
import FaceIcon from '@material-ui/icons/Face'
import Divider from '@material-ui/core/Divider'
import userIcon from 'assets/profile-user.svg'
import { calculateAge } from 'utils/helper'

import MyCard from 'components/common/MyCard'
import ClientCard from 'components/pages/Clients/ClientCard'

import Employee from 'models/employee'
import { GlobalContext } from 'hooks/useGlobalState'
import { ClientContext } from 'providers/ClientProvicer'
import Client from 'models/client'

export interface ViewUserProps {
  title: string
}

const ViewEmployee: React.SFC<ViewUserProps> = (props) => {
  const history = useHistory()
  const [_, dispatch] = useContext(GlobalContext)!

  const [clientState, clientDispatch] = useContext(ClientContext)!

  useEffect(() => {
    dispatch({ type: 'SET_TITLE', payload: 'View Employee' })
  }, [])

  const [employee, setEmployee] = useState<Employee>()

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
      birthdate: new Date('10/03/1991'),
    })
  }, [])

  const detail = (title: string, subtitle: any) => (
    <Grid container alignItems='center' direction='column' item xs={6}>
      <Typography component='h6' variant='h6'>
        {title}
      </Typography>
      <Typography variant='subtitle1' color='textSecondary'>
        {subtitle}
      </Typography>
    </Grid>
  )

  const renderClients = (clients: Client[]) => {
    return (
      <>
        <Grid
          container
          style={{ marginTop: 20, marginBottom: 10 }}
          xs={12}
          justify='space-between'
        >
          <Typography variant='subtitle1'>Recent Clients</Typography>
          <Link
            component='button'
            variant='body1'
            onClick={() => history.push('/clients')}
          >
            View All({clients.length})
          </Link>
        </Grid>
        <Grid
          container
          xs={12}
          justify='flex-start'
          direction='row'
          spacing={2}
          alignItems='center'
          style={{
            marginLeft: 0,
            padding: 0,
            WebkitOverflowScrolling: 'touch',
            overflowX: 'auto',
            flexWrap: 'nowrap',
          }}
        >
          {clients.map((client) => (
            <Grid key={client.id} item xs={12}>
              <Chip
                icon={<FaceIcon />}
                label={client.firstname}
                clickable
                onClick={() => history.push('/clients/' + client.id)}
                variant='outlined'
                color='default'
              />
            </Grid>
          ))}
        </Grid>
      </>
    )
  }

  return (
    <>
      <Grid container xs={12}>
        {employee && (
          <>
            <MyCard title='Employee Details'>
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
                  <Grid
                    container
                    item
                    xs={5}
                    justify='center'
                    alignItems='center'
                  >
                    <IconButton aria-label='play/pause'>
                      <img
                        style={{ width: 100 }}
                        src={userIcon}
                        alt='User Logo'
                      />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
              <Divider style={{ marginLeft: 20, marginRight: 20 }}></Divider>
              <CardContent>
                <Grid spacing={1} container xs={12} style={{ paddingLeft: 10 }}>
                  {detail('Gender', employee.gender)}
                  {detail('Civil Status', employee.civil)}
                  {detail('Contact', employee.contact)}
                  {detail(
                    'Age',
                    employee.birthdate
                      ? calculateAge(employee.birthdate)
                      : 'N/A',
                  )}
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
            {renderClients(clientState.clients)}
            <Grid
              style={{
                paddingLeft: 18,
                paddingTop: 10,
                paddingBottom: 5,
                marginTop: 10,
              }}
              container
              xs={12}
              justify='center'
              spacing={2}
            >
              <Grid item xs={6}>
                <Button
                  onClick={() => history.goBack()}
                  style={{ paddingTop: 15, paddingBottom: 15 }}
                  fullWidth
                  variant='contained'
                  color='default'
                >
                  BACK
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  onClick={() => history.push('/employees/edit/' + employee.id)}
                  style={{ paddingTop: 15, paddingBottom: 15 }}
                  fullWidth
                  variant='contained'
                  color='primary'
                >
                  EDIT
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </>
  )
}

export default ViewEmployee
