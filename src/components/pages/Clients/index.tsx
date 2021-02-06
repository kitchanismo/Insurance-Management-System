import MySearchField from 'components/common/MySearchField'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { useHistory } from 'react-router-dom'
import ClientCard from './ClientCard'
import { useContext, useEffect, useState } from 'react'
import { getClients } from 'services/clientService'
import { GlobalContext } from 'providers/GlobalProvider'
import { ClientContext } from 'providers/ClientProvider'
import MySkeletonCards from 'components/common/MySkeletonCards'
import MyChips from 'components/common/MyChips'

export interface ClientsProps {}

const Clients: React.SFC<ClientsProps> = () => {
  const [clientState, clientDispatch] = useContext(ClientContext)!

  const [globalState, globalDispatch] = useContext(GlobalContext)!

  const styles = useStyles()
  const history = useHistory()

  useEffect(() => {
    globalDispatch({ type: 'SET_TITLE', payload: 'Client Management' })
    clientDispatch({ type: 'SET_IS_LOADING', payload: true })
    globalDispatch({ type: 'SET_IS_LOADING', payload: true })
    getClients().then((clients) => {
      clientDispatch({ type: 'ON_LOAD_CLIENTS', payload: clients })
      globalDispatch({ type: 'SET_IS_LOADING', payload: false })
    })
  }, [])

  const isLoading = clientState.isLoading && !clientState.clients.length

  const chips = ['All', 'Lapse', 'Near', 'Installment', 'Fullpayment']

  return (
    <>
      <MySearchField
        onClick={() => {
          clientDispatch({ type: 'ON_RELOAD_PLANS' })
        }}
        style={{ marginBottom: 15 }}
      />

      <MyChips active='All' chips={chips}></MyChips>

      {isLoading && <MySkeletonCards />}
      {!isLoading && (
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
      )}

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
