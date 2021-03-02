import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'
import { image_provider } from 'configs/index.json'

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
  const styles = useStyles({ width, height })()
  return (
    <IconButton onClick={onClick}>
      <Avatar
        className={styles.avatar}
        src={!!src ? image_provider + src : ''}
        aria-label='clients'
      >
        {children?.()}
      </Avatar>
    </IconButton>
  )
}

const useStyles = ({ width, height }: { height?: number; width?: number }) =>
  makeStyles((theme: Theme) =>
    createStyles({
      avatar: {
        width: width || 100,
        height: height || 100,
        backgroundColor: theme.palette.secondary.main,
      },
    })
  )

export default MyAvatar
