import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

export interface MyAvatarProps {
  onClick?: () => void
  text?: string
  width?: number
  height?: number
}

const MyAvatar: React.SFC<MyAvatarProps> = ({
  onClick,
  text,
  width,
  height,
}) => {
  const styles = useStyles()
  return (
    <IconButton onClick={onClick}>
      <Avatar className={styles.avatar} aria-label='clients'>
        <Typography color='inherit' variant='h3'>
          {text}
        </Typography>
      </Avatar>
    </IconButton>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      width: 100,
      height: 100,
      backgroundColor: theme.palette.secondary.main,
    },
  }),
)

export default MyAvatar
