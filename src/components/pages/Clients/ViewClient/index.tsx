import React, { useState, useEffect, useContext } from 'react'

import { useHistory, useParams } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'
import { calculateAge, toMoney } from 'utils/helper'
import MyCard from 'components/common/MyCard'
import Client from 'models/client'
import { GlobalContext } from 'providers/GlobalProvider'

import { getClient, computeTotalCountPaid } from 'services/clientService'
import MySkeletonCard from 'components/common/MySkeletonCard'
import MyAvatar from 'components/common/MyAvatar'

export interface ViewClientProps {}

const ViewClient: React.SFC<ViewClientProps> = () => {
  const history = useHistory()

  const { id } = useParams<{ id: string }>()

  const [_, globalDispatch] = useContext(GlobalContext)!

  const [client, setClient] = useState<Client>()

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    globalDispatch({ type: 'SET_TITLE', payload: 'View Client' })
    getClient(+id).then((client) => {
      setClient(client)
      setIsLoading(false)
    })
  }, [])

  const detail = (title: string, subtitle: any) => (
    <Grid container alignItems='center' direction='column' item xs={6}>
      <Typography component='h6' variant='h6'>
        {title}
      </Typography>
      <Typography variant='subtitle1' color='textSecondary'>
        {subtitle}
      </Typography>
    </Grid>
  )

  const isSenior = calculateAge(client?.profile?.birthdate) >= 60

  return (
    <>
      {isLoading && <MySkeletonCard />}
      {client && !isLoading && (
        <>
          <MyCard title={'Code#' + client.code}>
            <CardContent>
              <Grid container xs={12} justify='space-between'>
                <Grid
                  style={{ paddingLeft: 10 }}
                  container
                  direction='column'
                  item
                  xs={7}
                  justify='flex-start'
                >
                  <Typography component='h6' variant='h6'>
                    {`${client?.profile?.lastname}, ${client?.profile?.firstname} ${client?.profile?.middlename}`}
                  </Typography>
                  <Typography variant='subtitle1' color='textSecondary'>
                    {client.plan?.name! + ' - ' + client.payment_mode}
                  </Typography>
                  {client.payment_mode === 'Installment' && (
                    <>
                      <Typography variant='caption' color='textSecondary'>
                        {'Lapse on ' +
                          new Date(client.next_payment!).toDateString()}
                      </Typography>
                      <Grid item xs={1}>
                        <Chip
                          style={{ marginTop: 5 }}
                          size='small'
                          label={computeTotalCountPaid(client) + ' Paid'}
                          color='default'
                          variant='outlined'
                        />
                        <Chip
                          style={{ marginTop: 5 }}
                          size='small'
                          label={`${isSenior ? 'senior' : 'non-senior'} / ${
                            client?.is_pwd ? 'pwd' : 'non-pwd'
                          }`}
                          color='default'
                          variant='outlined'
                        />
                      </Grid>
                    </>
                  )}
                </Grid>
                <Grid
                  container
                  item
                  xs={5}
                  justify='center'
                  alignItems='center'
                >
                  <MyAvatar src={client?.profile?.image_url} />
                </Grid>
              </Grid>
            </CardContent>
            <Divider style={{ marginLeft: 20, marginRight: 20 }}></Divider>
            <CardContent>
              <Grid spacing={1} container xs={12} style={{ paddingLeft: 10 }}>
                {detail('Period ', client.payment_period)}
                {detail('Balance', toMoney(client.balance!))}
                {detail('Branch', client?.branch?.name!)}
                {detail(
                  'Insured',
                  new Date(client.created_at!).toLocaleDateString()
                )}
              </Grid>
            </CardContent>
            <Divider style={{ marginLeft: 20, marginRight: 20 }}></Divider>
            <CardContent>
              <Grid spacing={1} container xs={12} style={{ paddingLeft: 10 }}>
                {detail('Gender', client?.profile?.gender)}
                {detail('Civil Status', client?.profile?.civil)}
                {detail(
                  'Contact',
                  client?.profile?.contact ? client?.profile?.contact : 'N/A'
                )}
                {detail(
                  'Age',
                  client?.profile?.birthdate
                    ? calculateAge(client?.profile?.birthdate)
                    : 'N/A'
                )}

                <Grid
                  container
                  alignItems='center'
                  direction='column'
                  item
                  xs={12}
                >
                  <Typography component='h6' variant='h6'>
                    Address
                  </Typography>
                  <Typography variant='subtitle1' color='textSecondary'>
                    {client?.profile?.address
                      ? client?.profile?.address
                      : 'N/A'}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </MyCard>
          <Grid
            style={{ paddingLeft: 18, paddingTop: 10, paddingBottom: 5 }}
            container
            xs={12}
            justify='center'
            spacing={2}
          >
            <Grid item xs={6}>
              <Button
                onClick={() => history.goBack()}
                style={{ paddingTop: 15, paddingBottom: 15 }}
                fullWidth
                variant='contained'
                color='default'
              >
                BACK
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                onClick={() => history.push('/clients/edit/' + client.id)}
                style={{ paddingTop: 15, paddingBottom: 15 }}
                fullWidth
                variant='contained'
                color='primary'
              >
                EDIT
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </>
  )
}

export default ViewClient
