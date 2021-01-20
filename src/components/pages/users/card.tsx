import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import ViewIcon from '@material-ui/icons/RemoveRedEye'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import userIcon from 'assets/profile-user.svg'
import makeStyles from '@material-ui/styles/makeStyles'
import createStyles from '@material-ui/styles/createStyles'
import { Theme } from '@material-ui/core/styles'
import User from 'models/user'

export interface UsersProps {
  user: Partial<User>
}

const UserCard: React.SFC<UsersProps> = ({ user }) => {
  const styles = useStyles()
  return (
    <Card style={{ paddingBottom: 5 }}>
      <div className={styles.cardHeader}>
        <Typography className={styles.titleHeader} component='h5' variant='h5'>
          {user.username}
        </Typography>
      </div>
      <CardContent>
        <Grid container xs={12} justify='space-between'>
          <Grid
            style={{ paddingLeft: 10 }}
            container
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
          </Grid>
          <Grid container item xs={5} justify='center' alignItems='center'>
            <IconButton aria-label='play/pause'>
              <img style={{ width: 100 }} src={userIcon} alt='User Logo' />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>

      <Divider style={{ marginLeft: 20, marginRight: 20 }}></Divider>
      <Grid container xs={12} justify='space-evenly'>
        <IconButton aria-label='previous'>
          <ViewIcon />
        </IconButton>
        <IconButton aria-label='play/pause'>
          <EditIcon />
        </IconButton>
        <IconButton aria-label='next'>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Card>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardHeader: {
      backgroundColor: theme.palette.primary.main,
      paddingLeft: 15,
      paddingTop: 10,
      paddingBottom: 10,
    },
    titleHeader: {
      color: 'white',
    },
  }),
)

export default UserCard
