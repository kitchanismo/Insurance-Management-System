import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'

export interface MyCardProps {
  title: any
  style?: React.CSSProperties
  endIcon?: JSX.Element
}

export const MyCard: React.FC<MyCardProps> = ({ title, style, ...props }) => {
  const styles = useStyles()
  return (
    <Card style={style}>
      <div className={styles.cardHeader}>
        <Typography className={styles.titleHeader} component='h6' variant='h6'>
          {title}
        </Typography>
        {props.endIcon}
      </div>
      {props.children}
    </Card>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: theme.palette.primary.main,
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 10,
      paddingBottom: 10,
    },
    titleHeader: {
      color: 'white',
    },
  }),
)
