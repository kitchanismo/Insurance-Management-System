import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Skeleton from '@material-ui/lab/Skeleton'

export interface MySkeletonCardProps {
  height?: number
}

const MySkeletonCard: React.SFC<MySkeletonCardProps> = ({ height = 285 }) => {
  const card = () => {
    return (
      <Paper style={{ marginBottom: 20 }}>
        <Skeleton animation='wave' variant='rect' height={50} />
        <Grid style={{ paddingTop: 20, marginBottom: 20 }} container xs={12}>
          <Grid style={{ paddingLeft: 20 }} item xs={6}>
            <Skeleton animation='wave' variant='text' width={150} />
            <Skeleton animation='wave' variant='text' width={150} />
            <Skeleton animation='wave' variant='text' width={150} />
            <Skeleton animation='wave' variant='text' width={100} />
            <Skeleton animation='wave' variant='text' width={100} />
          </Grid>
          <Grid item xs={6} container justify='center'>
            <Skeleton
              animation='wave'
              variant='circle'
              width={100}
              height={100}
            />
          </Grid>
        </Grid>
        <Skeleton animation='wave' variant='rect' height={height} />
      </Paper>
    )
  }
  return (
    <>
      <Grid container xs={12} direction='column'>
        {card()}
      </Grid>
    </>
  )
}

export default MySkeletonCard
