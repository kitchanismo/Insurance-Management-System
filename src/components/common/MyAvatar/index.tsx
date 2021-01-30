import IconButton from '@material-ui/core/IconButton'
import userIcon from 'assets/profile-user.svg'

export interface MyAvatarProps {
  onClick?: () => void
}

const MyAvatar: React.SFC<MyAvatarProps> = ({ onClick }) => {
  return (
    <IconButton onClick={onClick}>
      <img style={{ width: 100 }} src={userIcon} alt='User Logo' />
    </IconButton>
  )
}
export default MyAvatar
