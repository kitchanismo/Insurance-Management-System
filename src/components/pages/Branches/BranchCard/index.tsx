import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import MyCard from 'components/common/MyCard'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import { useHistory } from 'react-router-dom'

import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import ViewIcon from '@material-ui/icons/RemoveRedEye'
import Divider from '@material-ui/core/Divider'

import Branch from 'models/branch'

export interface BranchCardProps {
  branch: Branch
  onArchive?: (branch: Branch) => void
}

const BranchCard: React.SFC<BranchCardProps> = ({ branch, onArchive }) => {
  const history = useHistory()
  return (
    <MyCard title={`Branch#${branch.id}`}>
      <CardContent>
        <Grid style={{ marginBottom: 20 }} xs={12} direction='column' container>
          <Typography component='h3' variant='h6'>
            {branch.name}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            {branch.contact}
          </Typography>
          <Typography variant='subtitle1' color='textSecondary'>
            {branch.address}
          </Typography>
        </Grid>
        <Divider style={{ marginLeft: 20, marginRight: 20 }}></Divider>
        <Grid container xs={12} justify='space-evenly'>
          <IconButton
            onClick={() => history.push('/branches/edit/' + branch.id)}
            aria-label='edit'
          >
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onArchive?.(branch)} aria-label='archive'>
            <DeleteIcon />
          </IconButton>
        </Grid>
      </CardContent>
    </MyCard>
  )
}

export default BranchCard
