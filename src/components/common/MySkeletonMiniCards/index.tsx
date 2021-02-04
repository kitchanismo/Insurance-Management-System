import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Skeleton from '@material-ui/lab/Skeleton'

export interface MySkeletonMiniCardsProps {}

const MySkeletonMiniCards: React.SFC<MySkeletonMiniCardsProps> = () => {
  const card = () => {
    return (
      <Paper style={{ marginBottom: 20 }}>
        <Grid style={{ paddingTop: 20, marginBottom: 20 }} container xs={12}>
          <Grid item xs={6}>
            <Skeleton
              animation='wave'
              variant='circle'
              width={100}
              height={100}
            />
          </Grid>
          <Grid item xs={6} container justify='center'>
            <Skeleton animation='wave' variant='text' width={150} />
            <Skeleton animation='wave' variant='text' width={150} />
          </Grid>
        </Grid>
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

export default MySkeletonMiniCards
