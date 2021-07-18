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
import Fade from 'react-reveal/Fade'
import Scroll from 'react-scroll'
import { StatContext } from 'providers/StatisticProvider'
import { getCurrentUser, toMoney } from 'utils/helper'

export interface DashboardProps {}

const Dashboard: React.SFC<DashboardProps> = () => {
  const [state, dispatch] = useContext(GlobalContext)!

  const [{ stat }, statDispatch] = useContext(StatContext)!

  const [branchState, branchDispatch] = useContext(BranchContext)!

  const scroll = Scroll.animateScroll

  useEffect(() => {
    dispatch({ type: 'SET_TITLE', payload: 'Purple Supremacy' })

    getBranches().then((branches) => {
      branchDispatch({ type: 'ON_LOAD_BRANCHES', payload: branches })
    })

    if (getCurrentUser()?.role === 'admin') {
      dispatch({ type: 'SET_IS_LOADING', payload: true })

      getStatistics()
        .then((data) => {
          statDispatch({ type: 'ON_LOAD_STAT', payload: { ...stat, ...data } })

          dispatch({ type: 'SET_IS_LOADING', payload: false })
        })
        .catch((error) => console.log(error))
    }
    scroll.scrollToTop({ duration: 1000 })
  }, [])

  const branches = [...branchState.branches]

  branches.push({ id: 0, name: 'ALL BRANCHES' })

  return (
    <Fade delay={500}>
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
          {state?.currentUser?.role === 'admin' && (
            <>
              <Paper elevation={1} style={{ padding: 20, marginTop: 10 }}>
                <Grid container xs={12}>
                  <Grid
                    alignItems='center'
                    container
                    direction='column'
                    item
                    xs={4}
                  >
                    <Typography
                      component='h5'
                      variant='subtitle1'
                      color='textPrimary'
                    >
                      Draft
                    </Typography>
                    <Typography
                      component='h5'
                      variant='subtitle1'
                      color='secondary'
                    >
                      {stat?.draft}
                    </Typography>
                  </Grid>
                  <Grid
                    alignItems='center'
                    container
                    direction='column'
                    item
                    xs={4}
                  >
                    <Typography
                      component='h5'
                      variant='subtitle1'
                      color='textPrimary'
                    >
                      Lapsed
                    </Typography>
                    <Typography
                      component='h5'
                      variant='subtitle1'
                      color='secondary'
                    >
                      {stat?.lapsed}
                    </Typography>
                  </Grid>
                  <Grid
                    alignItems='center'
                    container
                    direction='column'
                    item
                    xs={4}
                  >
                    <Typography
                      component='h5'
                      variant='subtitle1'
                      color='textPrimary'
                    >
                      Near
                    </Typography>
                    <Typography
                      component='h5'
                      variant='subtitle1'
                      color='secondary'
                    >
                      {stat?.near}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </>
          )}
        </Grid>
        {state?.currentUser?.role === 'admin' && (
          <>
            <Grid spacing={1} container xs={12}>
              <Grid item xs={6} direction='column'>
                <Paper elevation={2} style={{ padding: 20 }}>
                  <Typography
                    component='h5'
                    variant='subtitle1'
                    color='textPrimary'
                  >
                    Gross Sales
                  </Typography>
                  <Typography
                    component='h5'
                    variant='subtitle1'
                    color='secondary'
                  >
                    {toMoney(stat?.grossSales)}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} direction='column'>
                <Paper elevation={2} style={{ padding: 20 }}>
                  <Typography
                    component='h5'
                    variant='subtitle1'
                    color='textPrimary'
                  >
                    Net Sales
                  </Typography>
                  <Typography
                    component='h5'
                    variant='subtitle1'
                    color='secondary'
                  >
                    {toMoney(stat?.netSales)}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>

            <Grid spacing={1} style={{ marginTop: 5 }} container xs={12}>
              <Grid item xs={6} direction='column'>
                <Paper elevation={2} style={{ padding: 20 }}>
                  <Typography
                    component='h5'
                    variant='subtitle1'
                    color='textPrimary'
                  >
                    Release
                  </Typography>
                  <Typography
                    component='h5'
                    variant='subtitle1'
                    color='secondary'
                  >
                    {toMoney(stat?.releaseCommissions)}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={6} direction='column'>
                <Paper elevation={2} style={{ padding: 20 }}>
                  <Typography
                    component='h5'
                    variant='subtitle1'
                    color='textPrimary'
                  >
                    Unrelease
                  </Typography>
                  <Typography
                    component='h5'
                    variant='subtitle1'
                    color='secondary'
                  >
                    {toMoney(stat?.unreleaseCommissions)}
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
                  <Typography
                    component='h5'
                    variant='subtitle1'
                    color='textPrimary'
                  >
                    Clients
                  </Typography>
                  <Typography
                    component='h5'
                    variant='subtitle1'
                    color='secondary'
                  >
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
          </>
        )}
      </Grid>
    </Fade>
  )
}

export default Dashboard
