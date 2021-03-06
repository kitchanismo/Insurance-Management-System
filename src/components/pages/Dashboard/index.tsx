import { GlobalContext } from 'providers/GlobalProvider'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import React, { useContext, useEffect, useState } from 'react'
import { BranchContext } from 'providers/BranchProvider'
import { getBranches } from 'services/branchService'
import {
  getClientStats,
  getStatistics,
  getSalesStats,
} from 'services/statisticService'
import StatisticGraph from './StatisticGraph'

export interface DashboardProps {}

interface StatisticsProps {
  totalClients: number
  grossSales: number
  netSales: number
  near: number
  lapsed: number
  releaseCommissions: number
  unreleaseCommissions: number
}

const Dashboard: React.SFC<DashboardProps> = () => {
  const [state, dispatch] = useContext(GlobalContext)!

  const [branchState, branchDispatch] = useContext(BranchContext)!

  const [stat, setStat] = useState<StatisticsProps>({
    totalClients: 0,
    grossSales: 0,
    netSales: 0,
    near: 0,
    lapsed: 0,
    releaseCommissions: 0,
    unreleaseCommissions: 0,
  })

  useEffect(() => {
    dispatch({ type: 'SET_TITLE', payload: 'Purple Supremacy' })
    dispatch({ type: 'SET_IS_LOADING', payload: true })
    getBranches().then((branches) => {
      branchDispatch({ type: 'ON_LOAD_BRANCHES', payload: branches })
    })

    getStatistics().then((data) => {
      setStat((prevData) => ({
        ...prevData,
        ...data,
      }))

      dispatch({ type: 'SET_IS_LOADING', payload: false })
    })
  }, [])

  const branches = [...branchState.branches]

  branches.push({ id: 0, name: 'ALL BRANCHES' })

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
                {stat?.lapsed}
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
                {stat?.near}
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
              ₱ {stat?.grossSales}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} direction='column'>
          <Paper elevation={2} style={{ padding: 20 }}>
            <Typography component='h5' variant='subtitle1' color='textPrimary'>
              Net Sales
            </Typography>
            <Typography component='h5' variant='subtitle1' color='secondary'>
              ₱ {stat?.netSales}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Grid spacing={1} style={{ marginTop: 5 }} container xs={12}>
        <Grid item xs={6} direction='column'>
          <Paper elevation={2} style={{ padding: 20 }}>
            <Typography component='h5' variant='subtitle1' color='textPrimary'>
              Release
            </Typography>
            <Typography component='h5' variant='subtitle1' color='secondary'>
              ₱ {stat?.releaseCommissions}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} direction='column'>
          <Paper elevation={2} style={{ padding: 20 }}>
            <Typography component='h5' variant='subtitle1' color='textPrimary'>
              Unrelease
            </Typography>
            <Typography component='h5' variant='subtitle1' color='secondary'>
              ₱ {stat?.unreleaseCommissions}
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
              Clients
            </Typography>
            <Typography component='h5' variant='subtitle1' color='secondary'>
              {stat?.totalClients}
            </Typography>
          </Grid>
        </Paper>
      </Grid>
      <Divider
        style={{ width: '100%', marginBottom: 10, marginTop: 20 }}
      ></Divider>
      <StatisticGraph
        title='client/s'
        getData={getClientStats}
        branches={branches}
      />
      <Divider
        style={{ width: '100%', marginBottom: 10, marginTop: 20 }}
      ></Divider>
      <StatisticGraph
        title='sales'
        getData={getSalesStats}
        branches={branches}
      />
    </Grid>
  )
}

export default Dashboard
