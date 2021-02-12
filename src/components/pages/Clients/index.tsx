import MySearchField from 'components/common/MySearchField'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

import Pagination from '@material-ui/lab/Pagination'
import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { useHistory } from 'react-router-dom'
import ClientCard from './ClientCard'
import { useContext, useEffect, useState } from 'react'
import { getClients, ClientProps } from 'services/clientService'
import { GlobalContext } from 'providers/GlobalProvider'
import { ClientContext } from 'providers/ClientProvider'
import MySkeletonCards from 'components/common/MySkeletonCards'
import MyChips, { MyChip } from 'components/common/MyChips'
import Scroll from 'react-scroll'

export interface ClientsProps {}

const Clients: React.SFC<ClientsProps> = () => {
  const [clientState, clientDispatch] = useContext(ClientContext)!

  const [globalState, globalDispatch] = useContext(GlobalContext)!

  const styles = useStyles()

  const scroll = Scroll.animateScroll

  const history = useHistory()

  const [page, setPage] = useState(1)

  const [chip, setChip] = useState<MyChip>({ value: '', name: 'All' })

  useEffect(() => {
    globalDispatch({ type: 'SET_TITLE', payload: 'Client Management' })
    onLoad({ page })
  }, [])

  const onLoad = ({ page, category, search }: ClientProps) => {
    clientDispatch({ type: 'SET_IS_LOADING', payload: true })
    globalDispatch({ type: 'SET_IS_LOADING', payload: true })
    getClients({ page, category, search }).then(({ clients, pages, total }) => {
      clientDispatch({
        type: 'ON_LOAD_CLIENTS',
        payload: { clients, pages, total },
      })
      globalDispatch({ type: 'SET_IS_LOADING', payload: false })
      scroll.scrollToTop({ duration: 1000 })
    })
  }

  const onFilter = (chip: MyChip) => {
    clientDispatch({ type: 'SET_TOTAL', payload: 0 })
    setChip(chip)
    setPage(1)
    onLoad({ page: 1, category: chip.value })
  }

  const onPage = (e: any, page: number) => {
    clientDispatch({ type: 'SET_TOTAL', payload: 0 })
    setPage(page)
    onLoad({ page, category: chip.value })
  }

  const onSearch = (search: string) => {
    setChip({ value: '', name: 'All' })
    setPage(1)
    onLoad({ page: 1, search })
  }

  const isLoading = clientState.isLoading && !clientState.clients.length

  const chips: MyChip[] = [
    { value: '', name: 'All' },
    { value: 'lapse', name: 'Lapse' },
    { value: 'near', name: 'Near' },
    { value: 'installment', name: 'Installment' },
    { value: 'fullpayment', name: 'Fullpayment' },
  ]

  return (
    <>
      <MySearchField onSearch={onSearch} style={{ marginBottom: 5 }} />

      <MyChips
        count={clientState.total}
        onChipSelected={onFilter}
        active={chip}
        chips={chips}
      ></MyChips>

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
          <Pagination
            style={{ marginTop: 15, marginBottom: 15 }}
            variant='outlined'
            color='primary'
            count={clientState.pages}
            siblingCount={0}
            page={page}
            onChange={onPage}
          />
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
      bottom: 60,
      right: 20,
    },
  }),
)

export default Clients
