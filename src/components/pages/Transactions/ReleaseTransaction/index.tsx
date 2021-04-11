import React, { useContext, useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import MyChips, { MyChip } from 'components/common/MyChips'
import MySearchField from 'components/common/MySearchField'

import Pagination from '@material-ui/lab/Pagination'
import { useHistory } from 'react-router-dom'
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
import { downloadCSV, toMoney } from 'utils/helper'
import MySkeletonCards from 'components/common/MySkeletonCards'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import ExpandMore from '@material-ui/icons/ExpandMore'
import { BranchContext } from 'providers/BranchProvider'
import { getBranches } from 'services/branchService'
import Branch from 'models/branch'

export interface CommissionReleaseProps {}

const ReleaseTransaction: React.SFC<CommissionReleaseProps> = () => {
  const [commissionState, commissionDispatch] = useContext(CommissionContext)!

  const [branchState, branchDispatch] = useContext(BranchContext)!

  const [_, globalDispatch] = useContext(GlobalContext)!

  const [chip, setChip] = useState<MyChip>({ value: '', name: 'All' })

  //  const [page, setPage] = useState(1)

  const [branchId, setBranchId] = useState('')

  const [range, setRange] = useState<'week' | 'month' | 'year' | ''>('')

  const history = useHistory()

  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: new Date(),
  })

  useEffect(() => {
    globalDispatch({ type: 'SET_TITLE', payload: 'Release Transaction' })
    onLoad({ range: '' })
    return () => {
      globalDispatch({ type: 'SET_IS_LOADING', payload: false })
    }
  }, [])

  const onLoad = ({
    search,
    positionId,
    branchId,
    range,
  }: {
    search?: string
    positionId?: string
    branchId?: string
    range: 'week' | 'month' | 'year' | ''
  }) => {
    globalDispatch({ type: 'SET_IS_LOADING', payload: true })
    commissionDispatch({ type: 'SET_IS_LOADING', payload: true })

    getTotalCommissionOfEmployees({ search, positionId, branchId, range })
      .then(({ commissions, total, range }) => {
        console.log(range)
        setDateRange({ from: new Date(range.from), to: new Date(range.to) })
        commissionDispatch({
          type: 'ON_LOAD_COMMISSIONS',
          payload: { commissions, total },
        })
        globalDispatch({ type: 'SET_IS_LOADING', payload: false })
      })
      .catch(() => globalDispatch({ type: 'SET_IS_LOADING', payload: false }))

    getBranches().then((branches) => {
      branchDispatch({ type: 'ON_LOAD_BRANCHES', payload: branches })
    })
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
    //setPage(1)
    onLoad({ positionId: chip.value, branchId, range })
    if (!!chip.value) {
      history.push('/transaction/releases')
    }
  }

  // const onPage = (e: any, page: number) => {
  //   commissionDispatch({ type: 'SET_TOTAL', payload: 0 })
  //   setPage(page)
  //   onLoad({ page, positionId: chip.value, branchId, range })
  //   history.push('/transaction/releases?page=' + page)
  // }

  const onSearch = (search: string) => {
    setChip({ value: '', name: 'All' })
    //setPage(1)
    onLoad({ search, range: '' })
    history.push('/transaction/releases?search=' + search)
  }

  const [alertDialog, setAlertDialog] = useState<AlertDataProps>({})
  const [alertDialogAll, setAlertDialogAll] = useState<AlertDataProps>({})

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
    releaseCommission(selectedCommission?.employee?.commissions!).then(
      (data) => {
        onLoad({ positionId: chip.value, range, branchId })
        downloadCSV([
          {
            ['Employee Name']: `${selectedCommission?.employee?.profile?.firstname} ${selectedCommission?.employee?.profile?.middlename} ${selectedCommission?.employee?.profile?.lastname}`,
            ['Branch']: selectedCommission?.employee?.branch?.name,
            ['Position']: selectedCommission?.employee?.position?.name,
            ['Commission Amount']: selectedCommission?.amount,
            ['From']: dateRange.from.toLocaleDateString(),
            ['To']: dateRange.to.toLocaleDateString(),
          },
        ])
        globalDispatch({
          type: 'SET_ALERT',
          payload: { message: 'Successfully Release', type: 'success' },
        })
      }
    )
    setAlertDialog({
      open: false,
    })
  }

  const handleReleaseAll = () => {
    const ids = commissionState?.commissions.reduce(
      (acc, com) => [...acc, ...com.employee?.commissions!],
      [] as number[]
    )

    releaseCommission(ids).then((data) => {
      onLoad({ positionId: chip.value, range, branchId })
      downloadCSV(csvData)
      globalDispatch({
        type: 'SET_ALERT',
        payload: { message: 'Successfully Release', type: 'success' },
      })
    })
    setAlertDialogAll({
      open: false,
    })
  }

  const isLoading =
    commissionState.isLoading && !commissionState.commissions.length

  const [anchorElRange, setAnchorElRange] = useState(null)

  const [anchorElBranch, setAnchorElBranch] = useState(null)

  const [textRange, setTextRange] = useState('ALL RECORDS')

  const [textBranch, setTextBranch] = useState('ALL BRANCHES')

  const handleClickRange = (event: any) => {
    setAnchorElRange(event.currentTarget)
  }

  const handleClickBranch = (event: any) => {
    setAnchorElBranch(event.currentTarget)
  }

  const handleSelectRange = (event: any) => {
    const value = event.currentTarget?.id
    const text = event.currentTarget?.title

    setAnchorElRange(null)

    if (!text) {
      return
    }

    setRange(value)
    setTextRange(text)
    onLoad({ positionId: chip.value, branchId, range: value })
  }

  const handleSelectBranch = (event: any) => {
    const value = event.currentTarget?.id
    const text = event.currentTarget?.title
    setAnchorElBranch(null)

    if (!text) {
      return
    }

    setBranchId(value)
    setTextBranch(text)
    onLoad({ positionId: chip.value, branchId: value, range })
  }

  const renderMenuItemBranch = (branch: Branch) => {
    return (
      <MenuItem
        key={branch?.id!}
        id={'' + branch?.id!}
        title={branch?.name}
        onClick={handleSelectBranch}
      >
        {branch?.name}
      </MenuItem>
    )
  }

  const branches = [...branchState.branches]

  branches.push({ id: '' as any, name: 'ALL BRANCHES' })

  const csvData = commissionState.commissions.map((com) => ({
    ['Employee Name']: `${com.employee?.profile?.firstname} ${com.employee?.profile?.middlename} ${com.employee?.profile?.lastname}`,
    ['Branch']: com?.employee?.branch?.name,
    ['Position']: com?.employee?.position?.name,
    ['Commission Amount']: com?.amount,
    ['From']: dateRange.from.toLocaleDateString(),
    ['To']: dateRange.to.toLocaleDateString(),
  }))

  // const headers = [
  //   { label: 'Employee Name', key: 'employee' },
  //   { label: 'Commission Amount', key: 'amount' },
  //   { label: 'To', key: 'to' },
  //   { label: 'From', key: 'from' },
  // ]

  return (
    <>
      <MyAlertDialog
        onAgree={handleRelease}
        onDisagree={() => setAlertDialog({ open: false })}
        data={alertDialog}
      />
      <MyAlertDialog
        onAgree={handleReleaseAll}
        onDisagree={() => setAlertDialogAll({ open: false })}
        data={alertDialogAll}
      />

      <MySearchField
        labelWidth={110}
        label='Name / Branch'
        onSearch={onSearch}
        style={{ marginBottom: 10 }}
      />

      <MyChips
        count={commissionState.total}
        onChipSelected={onFilter}
        active={chip}
        chips={chips}
      />

      <Grid
        style={{ marginBottom: 20 }}
        container
        xs={12}
        justify='space-between'
      >
        <Grid container xs={6} item>
          <Button
            aria-controls='simple-menu'
            aria-haspopup='true'
            color='default'
            onClick={handleClickRange}
            endIcon={<ExpandMore />}
          >
            {textRange}
          </Button>
          <Menu
            id='simple-menu'
            anchorEl={anchorElRange}
            keepMounted
            open={Boolean(anchorElRange)}
            onClose={handleSelectRange}
          >
            <MenuItem title='PAST 7 DAYS' id='week' onClick={handleSelectRange}>
              PAST 7 DAYS
            </MenuItem>
            <MenuItem
              title='PAST 30 DAYS'
              id='month'
              onClick={handleSelectRange}
            >
              PAST 30 DAYS
            </MenuItem>
            <MenuItem
              title='PAST 12 MONTHS'
              id='year'
              onClick={handleSelectRange}
            >
              PAST 12 MONTHS
            </MenuItem>
            <MenuItem title='ALL RECORDS' id='' onClick={handleSelectRange}>
              ALL RECORDS
            </MenuItem>
          </Menu>
        </Grid>
        <Grid container xs={6} item justify='flex-end'>
          <Button
            aria-controls='simple-menu-branch'
            aria-haspopup='true'
            color='default'
            onClick={handleClickBranch}
            endIcon={<ExpandMore />}
          >
            {textBranch}
          </Button>
          <Menu
            id='simple-menu-branch'
            anchorEl={anchorElBranch}
            keepMounted
            open={Boolean(anchorElBranch)}
            onClose={handleSelectBranch}
          >
            {branches.map((branch) => renderMenuItemBranch(branch || ''))}
          </Menu>
        </Grid>
      </Grid>

      {!!commissionState?.commissions.length && (
        <Typography style={{ marginBottom: 20 }} variant='subtitle2'>
          {`${dateRange.from.toDateString()} to ${dateRange.to.toDateString()}`}
        </Typography>
      )}

      {!!commissionState?.commissions.length && (
        <Grid style={{ marginBottom: 15 }} container xs={12} justify='center'>
          <Button
            onClick={() => {
              const totalAmount = commissionState?.commissions.reduce(
                (acc, com) => acc + com?.amount!,
                0
              )
              setAlertDialogAll({
                open: true,
                text: `Are you sure you want to release all commissions?`,
                description: `Amounting of ${toMoney(totalAmount)}`,
              })
            }}
            fullWidth
            variant='outlined'
            color='primary'
          >
            Release All
          </Button>
        </Grid>
      )}
      {isLoading && <MySkeletonCards />}
      {!isLoading && (
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
          {/* <Pagination
            style={{ marginTop: 15, marginBottom: 15 }}
            variant='outlined'
            color='primary'
            count={commissionState.pages}
            siblingCount={0}
            page={page}
            onChange={onPage}
          /> */}
        </Grid>
      )}
    </>
  )
}

export default ReleaseTransaction
