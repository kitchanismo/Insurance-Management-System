import { useContext, useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import MyChips, { MyChip } from 'components/common/MyChips'
import MySearchField from 'components/common/MySearchField'
import { PaymentContext } from 'providers/PaymentProvider'
import { getPayments } from 'services/paymentService'

import Pagination from '@material-ui/lab/Pagination'
import { useHistory, useLocation } from 'react-router-dom'
import qs from 'query-string'
import { GlobalContext } from 'providers/GlobalProvider'
import { CommissionContext } from 'providers/CommissionProvider'
import {
  getTotalCommissionOfEmployees,
  CommissionProps,
  releaseCommission,
} from 'services/commissionService'
import ReleaseCard from './ReleaseCard'
import MyAlertDialog, { AlertDataProps } from 'components/common/MyAlertDialog'
import Commission from 'models/commission'
import { toMoney } from 'utils/helper'

export interface CommissionReleaseProps {}

const ReleaseTransaction: React.SFC<CommissionReleaseProps> = () => {
  const [commissionState, commissionDispatch] = useContext(CommissionContext)!

  const [_, globalDispatch] = useContext(GlobalContext)!

  const [chip, setChip] = useState<MyChip>({ value: '', name: 'All' })

  const [page, setPage] = useState(1)

  const history = useHistory()

  useEffect(() => {
    globalDispatch({ type: 'SET_TITLE', payload: 'Release Transaction' })
    onLoad({ page: 1 })
  }, [])

  const onLoad = ({ page, search, category }: CommissionProps) => {
    getTotalCommissionOfEmployees({ page, search, category }).then(
      ({ commissions, total, pages }) => {
        commissionDispatch({
          type: 'ON_LOAD_COMMISSIONS',
          payload: { commissions, total, pages },
        })
      },
    )
  }

  const chips: MyChip[] = [
    { value: '', name: 'All' },
    { value: 1, name: 'Branch Manager' },
    { value: 2, name: 'Agency Manager' },
    { value: 3, name: 'Supervisor' },
  ]

  const onFilter = (chip: MyChip) => {
    commissionDispatch({ type: 'SET_TOTAL', payload: 0 })
    setChip(chip)
    setPage(1)
    onLoad({ page: 1, category: chip.value })
    if (!!chip.value) {
      history.push('/transaction/releases')
    }
  }

  const onPage = (e: any, page: number) => {
    commissionDispatch({ type: 'SET_TOTAL', payload: 0 })
    setPage(page)
    onLoad({ page, category: chip.value })
    history.push('/transaction/releases?page=' + page)
  }

  const onSearch = (search: string) => {
    setChip({ value: '', name: 'All' })
    setPage(1)
    onLoad({ page: 1, search })
    history.push('/transaction/releases?search=' + search)
  }

  const [alertDialog, setAlertDialog] = useState<AlertDataProps>({})

  const [selectedCommission, setSelectedCommission] = useState<Commission>()

  const handleSelectedCommission = (commission: Commission) => {
    setSelectedCommission(commission)
    setAlertDialog({
      open: true,
      text: `Are you sure you want to release "${commission?.employee?.profile?.lastname}, ${commission?.employee?.profile?.firstname} ${commission?.employee?.profile?.middlename}" commission?`,
      description: `Amounting of ${toMoney(commission?.amount!)}`,
    })
  }

  const handleRelease = () => {
    releaseCommission(selectedCommission?.employee?.id!).then((data) => {
      onLoad({ page, category: chip.value })
    })
    setAlertDialog({
      open: false,
    })
  }

  return (
    <>
      <MyAlertDialog
        onAgree={handleRelease}
        onDisagree={() => setAlertDialog({ open: false })}
        data={alertDialog}
      />
      <MySearchField onSearch={onSearch} style={{ marginBottom: 15 }} />
      <MyChips
        count={commissionState.total}
        onChipSelected={onFilter}
        active={chip}
        chips={chips}
      />
      <Grid
        container
        spacing={2}
        direction='column'
        justify='flex-start'
        alignItems='center'
      >
        {commissionState.commissions.map((commission) => (
          <Grid key={commission.id} item xs={12}>
            <ReleaseCard
              onRelease={handleSelectedCommission}
              commission={commission}
            />
          </Grid>
        ))}
        <Pagination
          style={{ marginTop: 15, marginBottom: 15 }}
          variant='outlined'
          color='primary'
          count={commissionState.pages}
          siblingCount={0}
          page={page}
          onChange={onPage}
        />
      </Grid>
    </>
  )
}

export default ReleaseTransaction
