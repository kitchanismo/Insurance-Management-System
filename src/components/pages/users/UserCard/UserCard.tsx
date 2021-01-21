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
import User from 'models/user'

export interface UsersProps {
  user: Partial<User>
}

export const UserCard: React.SFC<UsersProps> = ({ user }) => {
  const history = useHistory()
  return (
    <MyCard title={user.username} style={{ paddingBottom: 5 }}>
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
            <IconButton
              onClick={() => history.push('users/' + user.id)}
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
          onClick={() => history.push('users/' + user.id)}
          aria-label='previous'
        >
          <ViewIcon />
        </IconButton>
        <IconButton aria-label='play/pause'>
          <EditIcon />
        </IconButton>
        <IconButton aria-label='next'>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </MyCard>
  )
}
