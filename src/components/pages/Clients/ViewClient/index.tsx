import React, { useState, useEffect, useContext } from 'react'

import { useHistory, useParams } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'
import userIcon from 'assets/profile-user.svg'
import { calculateAge } from 'utils/helper'
import MyCard from 'components/common/MyCard'
import Client from 'models/client'
import { ClientContext } from 'providers/ClientProvider'
import { GlobalContext } from 'providers/GlobalProvider'
import { EmployeeContext } from 'providers/EmployeeProvider'

import {
  getClient,
  computeTotalCountPaid,
  computeTotalCountToPay,
} from 'services/clientService'
import MySkeletonCard from 'components/common/MySkeletonCard'
import MyAvatar from 'components/common/MyAvatar'
import { capitalize } from 'utils/helper'

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

  return (
    <Grid container xs={12}>
      {isLoading && <MySkeletonCard />}
      {client && !isLoading && (
        <>
          <MyCard title={client.code}>
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
                    {`${client.lastname}, ${client.firstname} ${client.middlename}`}
                  </Typography>
                  <Typography variant='subtitle1' color='textSecondary'>
                    {client.plan?.name! + ' - ' + client.payment_mode}
                  </Typography>

                  <Grid item xs={1}>
                    <Chip
                      style={{ marginTop: 5 }}
                      size='small'
                      label={
                        new Date(client.next_payment!).toLocaleDateString() +
                        ' Lapse'
                      }
                      color='default'
                      variant='outlined'
                    />
                    <Chip
                      style={{ marginTop: 10 }}
                      size='small'
                      label={computeTotalCountPaid(client) + ' Paid'}
                      color='default'
                      variant='outlined'
                    />
                  </Grid>
                </Grid>
                <Grid
                  container
                  item
                  xs={5}
                  justify='center'
                  alignItems='center'
                >
                  <MyAvatar
                    text={
                      capitalize(client.lastname!) +
                      capitalize(client.firstname!)
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
            <Divider style={{ marginLeft: 20, marginRight: 20 }}></Divider>
            <CardContent>
              <Grid spacing={1} container xs={12} style={{ paddingLeft: 10 }}>
                {detail('Period ', client.payment_period)}
                {detail('Balance', 'Php ' + client.balance)}
                {detail('Branch', client?.branch?.name!)}
                {detail(
                  'Insured',
                  new Date(client.created_at!).toLocaleDateString(),
                )}
              </Grid>
            </CardContent>
            <Divider style={{ marginLeft: 20, marginRight: 20 }}></Divider>
            <CardContent>
              <Grid spacing={1} container xs={12} style={{ paddingLeft: 10 }}>
                {detail('Gender', client.gender)}
                {detail('Civil Status', client.civil)}
                {detail('Contact', client.contact)}
                {detail(
                  'Age',
                  client.birthdate ? calculateAge(client.birthdate) : 'N/A',
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
                    {client.address}
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
    </Grid>
  )
}

export default ViewClient
