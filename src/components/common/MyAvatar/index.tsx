import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

export interface MyAvatarProps {
  onClick?: () => void
  text?: string
  width?: number
  height?: number
  children?: () => JSX.Element
  src?: string
}

const MyAvatar: React.SFC<MyAvatarProps> = ({
  onClick,
  src,
  width,
  height,
  children,
}) => {
  const styles = useStyles()
  return (
    <IconButton onClick={onClick}>
      <Avatar className={styles.avatar} src={src} aria-label='clients'>
        {children?.()}
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
