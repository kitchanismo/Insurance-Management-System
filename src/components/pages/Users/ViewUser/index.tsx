import React, { useState, useEffect, useContext } from 'react'
import Link from '@material-ui/core/Link'
import { useHistory, useParams } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent'
import Chip from '@material-ui/core/Chip'
import Badge from '@material-ui/core/Badge'
import Divider from '@material-ui/core/Divider'
import { calculateAge, capitalize } from 'utils/helper'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import MyCard from 'components/common/MyCard'
import { GlobalContext } from 'providers/GlobalProvider'
import Client from 'models/client'
import MyAvatar from 'components/common/MyAvatar'
import { getUser } from 'services/userService'
import MySkeletonCard from 'components/common/MySkeletonCard'
import MyMiniCards from 'components/common/MyMiniCards'
import MySkeletonMiniCards from 'components/common/MySkeletonMiniCards'
import { UserContext } from 'providers/UserProvider'
import User from 'models/user'

export interface ViewUserProps {
  title: string
}

const ViewUser: React.SFC<ViewUserProps> = (props) => {
  const history = useHistory()
  const styles = useStyles()
  const params = useParams<{ id: string }>()
  const [_, dispatch] = useContext(GlobalContext)!
  const [userState] = useContext(UserContext)!

  const [user, setUser] = useState<User>()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    dispatch({ type: 'SET_TITLE', payload: 'View User' })
    setIsLoading(true)
    getUser(+params.id).then((user) => {
      setUser(user)
      setIsLoading(false)
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

  const handleSelected = (client: Client) => {
    history.push('/users/' + client.id)
  }

  //   const branch = employeeState.branches.filter(
  //     (branch) => branch.id === employee?.branch
  //   )[0]

  //   const position = employeeState.positions.filter(
  //     (position) => position.id === employee?.position
  //   )[0]

  return (
    <>
      <Grid container xs={12}>
        {isLoading && <MySkeletonCard />}
        {!isLoading && user && (
          <>
            <MyCard title={'Username#' + user.id}>
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
                      {user?.role}
                    </Typography>
                    <Typography variant='subtitle1' color='textSecondary'>
                      {user?.branch?.name}
                    </Typography>
                  </Grid>
                  <Grid
                    container
                    item
                    xs={5}
                    justify='center'
                    alignItems='center'
                  >
                    <MyAvatar src={user.image_url} />
                  </Grid>
                </Grid>
              </CardContent>
              <Divider style={{ marginLeft: 20, marginRight: 20 }}></Divider>
            </MyCard>

            <Grid
              style={{
                paddingLeft: 18,
                paddingTop: 10,
                paddingBottom: 5,
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
                  onClick={() => history.push('/users/edit/' + user.id)}
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      backgroundColor: theme.palette.secondary.main,
    },
  })
)

export default ViewUser
