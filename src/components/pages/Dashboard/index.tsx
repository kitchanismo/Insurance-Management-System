import { GlobalContext } from 'providers/GlobalProvider'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import React, { useContext, useEffect, useState } from 'react'
import { BranchContext } from 'providers/BranchProvider'
import { getBranches } from 'services/branchService'
import MyGraph, { DataProps } from 'components/common/MyGraph'
import { getData, getStatistics } from 'services/statisticService'

export interface DashboardProps {}

const data: DataProps[] = [
  {
    name: 'Jan',
    count: 3000,
  },
  {
    name: 'Feb',
    count: 3000,
  },
  {
    name: 'Mar',
    count: 2000,
  },
  {
    name: 'Apr',
    count: 2780,
  },
  {
    name: 'May',
    count: 1890,
  },
  {
    name: 'Jun',
    count: 2390,
  },
  {
    name: 'Jul',
    count: 3390,
  },
  {
    name: 'Aug',
    count: 3690,
  },
  {
    name: 'Sep',
    count: 3350,
  },
  {
    name: 'Oct',
    count: 3340,
  },
  {
    name: 'Nov',
    count: 350,
  },
  {
    name: 'Dec',
    count: 3490,
  },
]

interface StatisticsProps {
  totalClients: number
  grossSales: number
  netSales: number
  near: number
  lapsed: number
  range: { start: string; end: string }
  statistics: DataProps[]
}

const Dashboard: React.SFC<DashboardProps> = () => {
  const [state, dispatch] = useContext(GlobalContext)!

  const [data, setData] = useState<StatisticsProps>({
    totalClients: 0,
    grossSales: 0,
    netSales: 0,
    near: 0,
    lapsed: 0,
    range: { start: '', end: '' },
    statistics: [],
  })

  const [branchId, setBranchId] = useState('')

  const [range, setRange] = useState('')

  useEffect(() => {
    dispatch({ type: 'SET_TITLE', payload: 'Purple Supremacy' })
    getBranches().then((branches) => {
      branchDispatch({ type: 'ON_LOAD_BRANCHES', payload: branches })
    })

    getStatistics().then((data) =>
      setData((prevData) => ({
        ...prevData,
        ...data,
      }))
    )
  }, [])

  useEffect(() => {
    getData(range, +branchId).then((data) => {
      setData((prevData) => ({
        ...prevData,
        ...data,
      }))
    })
  }, [range, branchId])

  const [branchState, branchDispatch] = useContext(BranchContext)!

  const branches = [...branchState.branches]

  branches.push({ id: 0, name: 'ALL BRANCHES' })

  const handleSelectedBranchClient = (branchId: string) => {
    setBranchId(branchId)
  }

  const handleSelectedRange = (range: string) => {
    setRange(range)
  }

  return (
    <Grid container justify='center' xs={12}>
      <Grid
        style={{ padding: 5, marginBottom: 5, paddingTop: 0 }}
        container
        xs={12}
        direction='column'
      >
        <Typography component='h5' variant='h5' color='textPrimary'>
          Welcome, {state.currentUser?.username || ''}
        </Typography>
        <Typography component='h5' variant='subtitle1' color='textSecondary'>
          Today is {new Date(Date.now()).toDateString()}
        </Typography>
        <Paper elevation={1} style={{ padding: 20, marginTop: 10 }}>
          <Grid container xs={12}>
            <Grid alignItems='center' container direction='column' item xs={4}>
              <Typography
                component='h5'
                variant='subtitle1'
                color='textPrimary'
              >
                Sms
              </Typography>
              <Typography component='h5' variant='subtitle1' color='secondary'>
                0
              </Typography>
            </Grid>
            <Grid alignItems='center' container direction='column' item xs={4}>
              <Typography
                component='h5'
                variant='subtitle1'
                color='textPrimary'
              >
                Lapsed
              </Typography>
              <Typography component='h5' variant='subtitle1' color='secondary'>
                {data?.lapsed}
              </Typography>
            </Grid>
            <Grid alignItems='center' container direction='column' item xs={4}>
              <Typography
                component='h5'
                variant='subtitle1'
                color='textPrimary'
              >
                Near
              </Typography>
              <Typography component='h5' variant='subtitle1' color='secondary'>
                {data?.near}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
      <Grid spacing={1} container xs={12}>
        <Grid item xs={6} direction='column'>
          <Paper elevation={2} style={{ padding: 20 }}>
            <Typography component='h5' variant='subtitle1' color='textPrimary'>
              Gross Sales
            </Typography>
            <Typography component='h5' variant='subtitle1' color='secondary'>
              ₱ {data?.grossSales}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} direction='column'>
          <Paper elevation={2} style={{ padding: 20 }}>
            <Typography component='h5' variant='subtitle1' color='textPrimary'>
              Net Sales
            </Typography>
            <Typography component='h5' variant='subtitle1' color='secondary'>
              ₱ {data?.netSales}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Grid
        style={{ padding: 5, marginTop: 5 }}
        item
        xs={12}
        direction='column'
        alignItems='center'
      >
        <Paper elevation={2} style={{ padding: 20 }}>
          <Grid container xs={12} direction='column' alignItems='center'>
            <Typography component='h5' variant='subtitle1' color='textPrimary'>
              Total Clients
            </Typography>
            <Typography component='h5' variant='subtitle1' color='secondary'>
              {data?.totalClients}
            </Typography>
          </Grid>
        </Paper>
      </Grid>
      <Divider
        style={{ width: '100%', marginBottom: 10, marginTop: 20 }}
      ></Divider>
      <MyGraph
        onSelectedRange={handleSelectedRange}
        onSelectedBranch={handleSelectedBranchClient}
        title='client/s'
        range={data?.range!}
        data={data?.statistics!}
        branches={branches}
      />
      <Divider
        style={{ width: '100%', marginBottom: 10, marginTop: 20 }}
      ></Divider>
    </Grid>
  )
}

export default Dashboard
