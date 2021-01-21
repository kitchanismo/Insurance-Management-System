import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Chip from '@material-ui/core/Chip'
import { MyCard } from 'components/Common/MyCard'
import Divider from '@material-ui/core/Divider'
import userIcon from 'assets/profile-user.svg'

import User from 'models/user'

export interface ViewUserProps {}

export const ViewUser: React.SFC<ViewUserProps> = () => {
  const [user, setUser] = useState<Partial<User> | null>(null)

  useEffect(() => {
    setUser({
      id: 1,
      username: 'kitchan',
      firstname: 'Firstname',
      middlename: 'Middlename',
      lastname: 'Lastname',
      position: 'Branch Manager',
      civil: 'Single',
      gender: 'Male',
      address: 'Somewhere ssdsdsd sdfdfdfdf sfdfdff',
      contact: '09234545866',
      is_active: true,
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
      {user && (
        <MyCard title='Personal Details'>
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
                  {`${user.lastname}, ${user.firstname} ${user.middlename}`}
                </Typography>
                <Typography variant='subtitle1' color='textSecondary'>
                  {user.position}
                </Typography>
                <Grid item xs={1}>
                  <Chip
                    style={{ marginTop: 5 }}
                    size='small'
                    label={user.is_active ? 'Active' : 'Deactivate'}
                    variant='default'
                    color={user.is_active ? 'primary' : 'secondary'}
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
              {info('Username', user.username)}
              {info('Gender', user.gender)}
              {info('Civil Status', user.civil)}
              {info('Contact', user.contact)}

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
                  {user.address}
                </Typography>
              </Grid>
              {info('Birthdate', user.birthdate || 'N/A')}
              {info('Team', user.team || 'N/A')}
            </Grid>
          </CardContent>
        </MyCard>
      )}
    </Grid>
  )
}
