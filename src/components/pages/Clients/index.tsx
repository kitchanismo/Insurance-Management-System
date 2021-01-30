import MySearchField from 'components/common/MySearchField'
import Client from 'models/client'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { useHistory } from 'react-router-dom'
import ClientCard from './ClientCard'
import { useContext, useEffect } from 'react'
import { getClients } from 'api/clientService'
import { ClientContext } from 'hooks/useClientState'
import { GlobalContext } from 'hooks/useGlobalState'

export interface ClientsProps {}

const Clients: React.SFC<ClientsProps> = () => {
  const [clientState, clientDispatch] = useContext(ClientContext)!

  const [globalState, globalDispatch] = useContext(GlobalContext)!

  const styles = useStyles()
  const history = useHistory()

  useEffect(() => {
    globalDispatch({ type: 'setTitle', payload: 'Client Management' })
    clientDispatch({ type: 'setIsLoading', payload: true })
    globalDispatch({ type: 'setIsLoading', payload: true })
    getClients().then((clients) => {
      clientDispatch({ type: 'onLoadClients', payload: clients })
      globalDispatch({ type: 'setIsLoading', payload: false })
    })
  }, [])

  if (clientState.isLoading && !clientState.clients.length)
    return <h4>Loading...</h4>

  return (
    <>
      <MySearchField
        onClick={() => {
          clientDispatch({ type: 'onReloadPlans' })
          console.log(clientState.onReloadPlans)
        }}
        style={{ marginBottom: 15 }}
      />
      <Grid
        container
        spacing={2}
        direction='column'
        justify='flex-start'
        alignItems='center'
      >
        {clientState.clients.map((client) => (
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

export default Clients
