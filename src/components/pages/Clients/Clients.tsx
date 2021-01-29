import { MySearchField } from 'components/Common/MySearchField'
import Client from 'models/client'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { useHistory } from 'react-router-dom'
import { ClientCard } from './ClientCard'
import { useContext, useEffect } from 'react'
import ClientContext from 'contexts/clientContext'
import GlobalContext from 'contexts/globalContext'

export interface ClientsProps {}

export const Clients: React.SFC<ClientsProps> = () => {
  const clientCtx = useContext(ClientContext)
  const globalCtx = useContext(GlobalContext)

  const styles = useStyles()
  const history = useHistory()

  useEffect(() => {
    globalCtx?.setTitle('Client Management')
    clientCtx?.onLoadClients()
  }, [])

  return (
    <>
      <MySearchField style={{ marginBottom: 15 }} />
      <Grid
        container
        spacing={2}
        direction='column'
        justify='flex-start'
        alignItems='center'
      >
        {clientCtx?.clients.map((client) => (
          <Grid key={client.id} item xs={12}>
            <ClientCard key={client.id} client={client} />
          </Grid>
        ))}
      </Grid>

      <Fab
        onClick={() => history.push('/clients/new')}
        className={styles.fab}
        color='primary'
        aria-label='add'
      >
        <AddIcon />
      </Fab>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'fixed',
      bottom: 20,
      right: 20,
    },
  }),
)
