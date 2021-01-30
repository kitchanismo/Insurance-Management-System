import React from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Card, { CardProps } from '@material-ui/core/Card'

export interface MyCardProps extends CardProps {
  title: any
}

export const MyCard: React.FC<MyCardProps> = ({ title, ...props }) => {
  const styles = useStyles()
  return (
    <Card {...props}>
      <div className={styles.cardHeader}>
        <Typography className={styles.titleHeader} component='h6' variant='h6'>
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
      display: 'flex',
      minWidth: 444,
      justifyContent: 'flex-start',
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
