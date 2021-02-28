import React, { useContext, useState } from 'react'
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
import User from 'models/user'

export interface UserCardProps {
  user: User
  onArchive?: (user: User) => void
}

const UserCard: React.SFC<UserCardProps> = ({ user, onArchive }) => {
  const history = useHistory()
  return (
    <>
      <MyCard title={'Username#' + user?.username} style={{ paddingBottom: 5 }}>
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
                {`${user?.lastname!}, ${user?.firstname!} ${user?.middlename!}`}
              </Typography>
              <Typography variant='subtitle1' color='textSecondary'>
                {user?.branch?.name}
              </Typography>
              <Typography variant='subtitle1' color='textSecondary'>
                {user?.role!}
              </Typography>
            </Grid>
            <Grid container item xs={5} justify='center' alignItems='center'>
              <MyAvatar
                src={user.image_url}
                onClick={() => history.push('/users/' + user.id)}
              />
            </Grid>
          </Grid>
        </CardContent>

        <Divider style={{ marginLeft: 20, marginRight: 20 }}></Divider>
        <Grid container xs={12} justify='space-evenly'>
          {/* <IconButton
            onClick={() => history.push('/users/' + user.id)}
            aria-label='view'
          >
            <ViewIcon />
          </IconButton> */}
          <IconButton
            onClick={() => history.push('/users/edit/' + user.id)}
            aria-label='edit'
          >
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onArchive?.(user)} aria-label='archive'>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </MyCard>
    </>
  )
}

export default UserCard
