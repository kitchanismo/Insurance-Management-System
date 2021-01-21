import * as React from 'react'
import makeStyles from '@material-ui/styles/makeStyles'
import createStyles from '@material-ui/styles/createStyles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import { Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent'

export interface MyCardProps {
  title: any
  style?: React.CSSProperties
}

export const MyCard: React.FC<MyCardProps> = ({ title, style, ...props }) => {
  const styles = useStyles()
  return (
    <Card style={style}>
      <div className={styles.cardHeader}>
        <Typography className={styles.titleHeader} component='h5' variant='h5'>
          {title}
        </Typography>
      </div>
      {props.children}
    </Card>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardHeader: {
      backgroundColor: theme.palette.primary.main,
      paddingLeft: 15,
      paddingTop: 10,
      paddingBottom: 10,
    },
    titleHeader: {
      color: 'white',
    },
  }),
)
