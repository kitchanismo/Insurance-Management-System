import MyCard from 'components/common/MyCard'
import React from 'react'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import ViewIcon from '@material-ui/icons/RemoveRedEye'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'
import userIcon from 'assets/profile-user.svg'
import Client from 'models/client'
import { useHistory } from 'react-router-dom'
import MyAvatar from 'components/common/MyAvatar'
import { computeTotalPaid, computeTotalPay } from 'api/clientService'

export interface ClientCardProps {
  client: Client
}

export const ClientCard: React.SFC<ClientCardProps> = ({ client }) => {
  const history = useHistory()

  return (
    <MyCard title={client.code} style={{ paddingBottom: 5 }}>
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
              {`${client.lastname}, ${client.firstname} ${client.middlename}`}
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
              {client.plan + ' - ' + client.payment_mode}
            </Typography>
            <Grid item xs={1}>
              <Chip
                style={{ marginTop: 5 }}
                size='small'
                label={
                  computeTotalPaid(client) +
                  '/' +
                  computeTotalPay(client) +
                  ' Paid'
                }
                variant='default'
                color='secondary'
              />
            </Grid>
          </Grid>
          <Grid container item xs={5} justify='center' alignItems='center'>
            <MyAvatar onClick={() => history.push('/clients/' + client.id)} />
          </Grid>
        </Grid>
      </CardContent>

      <Divider style={{ marginLeft: 20, marginRight: 20 }}></Divider>
      <Grid container xs={12} justify='space-evenly'>
        <IconButton
          onClick={() => history.push('/clients/' + client.id)}
          aria-label='view'
        >
          <ViewIcon />
        </IconButton>
        <IconButton
          onClick={() => history.push('/clients/edit/' + client.id)}
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
export default ClientCard
