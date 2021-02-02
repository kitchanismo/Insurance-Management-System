import IconButton from '@material-ui/core/IconButton'
import userIcon from 'assets/profile-user.svg'

export interface MyAvatarProps {
  onClick?: () => void
  width?: number
  height?: number
}

const MyAvatar: React.SFC<MyAvatarProps> = ({ onClick, width, height }) => {
  return (
    <IconButton onClick={onClick}>
      <img
        style={{ width: width || 100, height }}
        src={userIcon}
        alt='User Logo'
      />
    </IconButton>
  )
}
export default MyAvatar
