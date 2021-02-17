import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Skeleton from '@material-ui/lab/Skeleton'

export interface MySkeletonMiniCardsProps {}

const MySkeletonMiniCards: React.SFC<MySkeletonMiniCardsProps> = () => {
  const card = () => {
    return (
      <Paper style={{ paddingLeft: 15, width: 230 }}>
        <Grid
          style={{ minHeight: 92, display: 'flex', alignItems: 'center' }}
          container
          xs={12}
        >
          <Grid item container justify='center' xs={3}>
            <Skeleton
              animation='wave'
              variant='circle'
              width={40}
              height={40}
            />
          </Grid>
          <Grid item xs={9} container justify='flex-start'>
            <Skeleton animation='wave' variant='text' width={150} />
            <Skeleton animation='wave' variant='text' width={100} />
          </Grid>
        </Grid>
      </Paper>
    )
  }
  return (
    <>
      <Grid
        style={{
          marginLeft: 5,
          marginTop: 15,
          padding: 0,
          paddingBottom: 5,
          WebkitOverflowScrolling: 'touch',
          overflowX: 'auto',
          flexWrap: 'nowrap',
        }}
        container
        xs={12}
        justify='flex-start'
        direction='row'
        spacing={1}
      >
        {card()}
      </Grid>
    </>
  )
}

export default MySkeletonMiniCards
