import Grid from '@material-ui/core/Grid'
import notFound from 'assets/404.svg'
export interface NotFoundProps {}

const NotFound: React.SFC<NotFoundProps> = () => {
  return (
    <Grid container justify='center'>
      <img width='300' src={notFound} alt='not found' />
      <h3>Page not found</h3>
    </Grid>
  )
}

export default NotFound
