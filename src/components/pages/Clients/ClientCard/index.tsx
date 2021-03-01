import MyCard from 'components/common/MyCard'
import { useContext } from 'react'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import ViewIcon from '@material-ui/icons/RemoveRedEye'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import Chip from '@material-ui/core/Chip'
import Client from 'models/client'
import { useHistory } from 'react-router-dom'
import MyAvatar from 'components/common/MyAvatar'

import { computeTotalCountPaid, hasCommission } from 'services/clientService'

export interface ClientCardProps {
  client: Client
  onArchieve?: (client: Client) => void
}

export const ClientCard: React.SFC<ClientCardProps> = ({
  client,
  onArchieve,
}) => {
  const history = useHistory()
  return (
    <MyCard title={`Code#${client.code}`} style={{ paddingBottom: 5 }}>
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
              {client?.branch?.name}
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
              {client.plan?.name! + ' - ' + client.payment_mode}
            </Typography>

            {client.payment_mode === 'Installment' && (
              <>
                <Typography variant='caption' color='textSecondary'>
                  {'Lapse on ' + new Date(client.next_payment!).toDateString()}
                </Typography>
                <Grid item xs={1}>
                  <Chip
                    style={{ marginTop: 5 }}
                    size='small'
                    label={
                      hasCommission(client!) ? 'on commission' : 'no commission'
                    }
                    variant='outlined'
                    color={hasCommission(client!) ? 'secondary' : 'default'}
                  />
                  <Chip
                    style={{ marginTop: 10 }}
                    size='small'
                    label={computeTotalCountPaid(client) + ' paid'}
                    color='default'
                    variant='outlined'
                  />
                </Grid>
              </>
            )}
          </Grid>
          <Grid container item xs={5} justify='center' alignItems='center'>
            <MyAvatar
              src={client?.image_url}
              onClick={() => history.push('/clients/' + client.id)}
            />
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
        <IconButton onClick={() => onArchieve?.(client)} aria-label='archive'>
          <DeleteIcon />
        </IconButton>
      </Grid>
    </MyCard>
  )
}
export default ClientCard
