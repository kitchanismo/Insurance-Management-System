import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import MyCard from 'components/common/MyCard'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import { useHistory } from 'react-router-dom'

import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import ViewIcon from '@material-ui/icons/RemoveRedEye'
import Divider from '@material-ui/core/Divider'

import Commission from 'models/commission'
import MyAvatar from 'components/common/MyAvatar'
import { toMoney } from 'utils/helper'

export interface CommissionCardProps {
  commission: Commission
}

const CommissionCard: React.SFC<CommissionCardProps> = ({ commission }) => {
  const history = useHistory()
  const fullname = `${commission?.employee?.profile?.lastname}, ${commission?.employee?.profile?.firstname} ${commission?.employee?.profile?.middlename}`
  return (
    <MyCard title={`OR#${commission.payment?.or_number}`}>
      <CardContent>
        <Grid
          style={{ marginBottom: 20 }}
          xs={12}
          justify='space-between'
          container
        >
          <Grid
            style={{ paddingLeft: 10 }}
            container
            item
            direction='column'
            xs={7}
            justify='flex-start'
          >
            <Typography component='h3' variant='h6'>
              {fullname}
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
              {commission?.employee?.position?.name}
            </Typography>
            <Typography variant='subtitle1' color='textSecondary'>
              {toMoney(commission?.amount!)}
            </Typography>
            <Typography variant='caption' color='textSecondary'>
              {new Date(commission?.created_at!).toDateString()}
            </Typography>
            <Grid item xs={1}>
              <Chip
                style={{ marginTop: 5 }}
                size='small'
                label={commission.is_release ? 'release' : 'unrelease'}
                variant='outlined'
                color={!commission.is_release ? 'secondary' : 'default'}
              />
            </Grid>
          </Grid>
          <Grid container item xs={5} justify='center' alignItems='center'>
            <MyAvatar
              src={commission?.employee?.profile?.image_url}
              onClick={() =>
                history.push('/payments/' + commission?.payment?.id)
              }
            />
          </Grid>
        </Grid>
      </CardContent>
    </MyCard>
  )
}

export default CommissionCard
