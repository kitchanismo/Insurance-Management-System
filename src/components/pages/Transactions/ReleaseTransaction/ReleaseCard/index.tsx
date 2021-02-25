import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'

import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'

import MyCard from 'components/common/MyCard'
import MyAvatar from 'components/common/MyAvatar'
import Commission from 'models/commission'
import ReleaseIcon from '@material-ui/icons/LocalAtm'
import { toMoney } from 'utils/helper'

export interface ReleaseCardProps {
  commission: Commission
  onRelease?: (commission: Commission) => void
}

const ReleaseCard: React.SFC<ReleaseCardProps> = ({
  commission,
  onRelease,
}) => {
  const history = useHistory()

  return (
    <>
      <MyCard
        title={'Employee#' + commission?.employee?.id}
        style={{ paddingBottom: 5 }}
      >
        <CardContent>
          <Grid container xs={12} justify='space-between'>
            <Grid
              style={{ paddingLeft: 10 }}
              container
              item
              direction='column'
              xs={7}
              justify='flex-start'
            >
              <Typography component='h3' variant='h6'>
                {`${commission?.employee?.profile?.lastname}, ${commission?.employee?.profile?.firstname} ${commission?.employee?.profile?.middlename}`}
              </Typography>
              <Typography variant='subtitle1' color='textSecondary'>
                {commission?.employee?.branch?.name}
              </Typography>
              <Typography variant='subtitle1' color='textSecondary'>
                {commission?.employee?.position?.name}
              </Typography>

              <Typography variant='subtitle1' color='textSecondary'>
                {toMoney(commission?.amount!)}
              </Typography>
            </Grid>
            <Grid container item xs={5} justify='center' alignItems='center'>
              <MyAvatar
                src={commission?.employee?.profile?.image_url}
                // onClick={() => history.push('/commissions/' + commission.id)}
              />
            </Grid>
          </Grid>
        </CardContent>

        <Divider style={{ marginLeft: 20, marginRight: 20 }}></Divider>
        <Grid style={{ padding: 15 }} container xs={12} justify='space-evenly'>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <Button
              onClick={() => onRelease?.(commission)}
              fullWidth
              variant='text'
              color='primary'
            >
              Release
            </Button>
          </Grid>

          <Grid item xs={3}></Grid>
        </Grid>
      </MyCard>
    </>
  )
}

export default ReleaseCard
