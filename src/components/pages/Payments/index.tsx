import { useContext, useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import MyChips, { MyChip } from 'components/common/MyChips'
import MySearchField from 'components/common/MySearchField'
import { PaymentContext } from 'providers/PaymentProvider'
import { getPayments } from 'services/paymentService'
import PaymentCard from './PaymentCard'
import Pagination from '@material-ui/lab/Pagination'
import { useHistory, useLocation } from 'react-router-dom'
import qs from 'query-string'
import { GlobalContext } from 'providers/GlobalProvider'
import MySkeletonCards from 'components/common/MySkeletonCards'

export interface PaymentHistoryProps {}

const PaymentHistory: React.SFC<PaymentHistoryProps> = () => {
  const [_, globalDispatch] = useContext(GlobalContext)!
  const [paymentState, paymentDispatch] = useContext(PaymentContext)!

  const [chip, setChip] = useState<MyChip>({ value: '', name: 'All' })

  const [page, setPage] = useState(1)

  const location = useLocation()

  const history = useHistory()

  useEffect(() => {
    globalDispatch({ type: 'SET_TITLE', payload: 'Payment History' })

    const { page, search } = qs.parse(location.search)
    const currentPage = !!page ? +page : 1
    setPage(currentPage)
    onLoad({
      page: currentPage,
      search: (search as string) || '',
    })
    return () => {
      globalDispatch({ type: 'SET_IS_LOADING', payload: false })
    }
  }, [])

  const chips = [{ value: '', name: 'All' }]

  const onPage = (e: any, page: number) => {
    paymentDispatch({ type: 'SET_TOTAL', payload: 0 })
    setPage(page)
    onLoad({ page, category: chip.value })
    history.push('/payments?page=' + page)
  }

  interface LoadProps {
    search?: string
    category?: string
    page: number
  }

  const onLoad = ({ page, search, category }: LoadProps) => {
    globalDispatch({ type: 'SET_IS_LOADING', payload: true })
    paymentDispatch({ type: 'SET_IS_LOADING', payload: true })
    getPayments({ page, search, category })
      .then(({ payments, total, pages }) => {
        paymentDispatch({
          type: 'ON_LOAD_PAYMENTS',
          payload: { payments, total, pages },
        })
        globalDispatch({ type: 'SET_IS_LOADING', payload: false })
      })
      .catch(() => globalDispatch({ type: 'SET_IS_LOADING', payload: false }))
  }

  const onSearch = (search: string) => {
    setChip({ value: '', name: 'All' })
    onLoad({ page: 1, search })
    setPage(1)
  }

  const onFilter = (chip: MyChip) => {
    paymentDispatch({ type: 'SET_TOTAL', payload: 0 })
    setChip(chip)
    onLoad({ page: 1, category: chip.value })
    setPage(1)
    history.push('/payments?page=' + 1)
  }

  const isLoading = paymentState.isLoading && !paymentState.payments.length

  return (
    <>
      <MySearchField
        labelWidth={160}
        label='Name / Code / Branch'
        onSearch={onSearch}
        style={{ marginBottom: 15 }}
      />
      <MyChips
        count={paymentState.total}
        onChipSelected={onFilter}
        active={chip}
        chips={chips}
      />
      {isLoading && <MySkeletonCards />}
      {!isLoading && (
        <Grid
          container
          spacing={2}
          direction='column'
          justify='flex-start'
          alignItems='center'
        >
          {paymentState.payments.map((payment) => (
            <Grid key={payment.id} item xs={12}>
              <PaymentCard payment={payment} />
            </Grid>
          ))}
          <Pagination
            style={{ marginTop: 15, marginBottom: 15 }}
            variant='outlined'
            color='primary'
            count={paymentState.pages}
            siblingCount={0}
            page={page}
            onChange={onPage}
          />
        </Grid>
      )}
    </>
  )
}

export default PaymentHistory
