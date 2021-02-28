import UserCard from 'components/pages/Users/UserCard'
import { UserContext } from 'providers/UserProvider'
import { useHistory, useLocation } from 'react-router-dom'

import { useContext, useEffect, useState } from 'react'
import { getUsers, archiveUser } from 'services/userService'
import Grid from '@material-ui/core/Grid'
import Pagination from '@material-ui/lab/Pagination'
import User from 'models/user'
import { GlobalContext } from 'providers/GlobalProvider'
import MyAlertDialog, { AlertDataProps } from 'components/common/MyAlertDialog'
import MySearchField from 'components/common/MySearchField'
import MyChips, { MyChip } from 'components/common/MyChips'
import MySkeletonCards from 'components/common/MySkeletonCards'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'

export interface UsersProps {}

const Users: React.SFC<UsersProps> = () => {
  const [userState, userDispatch] = useContext(UserContext)!

  const history = useHistory()

  const [_, globalDispatch] = useContext(GlobalContext)!

  const [chip, setChip] = useState<MyChip>({ value: '', name: 'All' })

  const [page, setPage] = useState(1)

  useEffect(() => {
    globalDispatch({ type: 'SET_TITLE', payload: 'User Management' })
    onLoad({ page: 1, search: '' })
  }, [])

  const onLoad = ({ page, search }: { page?: number; search?: string }) => {
    globalDispatch({ type: 'SET_IS_LOADING', payload: true })
    userDispatch({ type: 'SET_IS_LOADING', payload: true })
    getUsers({ page, search }).then(({ users, pages, total }) => {
      globalDispatch({ type: 'SET_IS_LOADING', payload: false })

      userDispatch({ type: 'ON_LOAD_USERS', payload: { users, pages, total } })
    })
  }

  const onPage = (e: any, page: number) => {}

  const handleSelectedUser = (user: User) => {
    setUser(user)
    setAlertDialog({
      open: true,
      text: `Are you sure you want to archive ${user.lastname}, ${user.firstname} ${user.middlename}?`,
      description:
        'Archiving will not permanently delete the user account in the database.',
    })
  }

  const [alertDialog, setAlertDialog] = useState<AlertDataProps>({})

  const [user, setUser] = useState<User>()

  const handleArchive = () => {
    archiveUser(user?.id!).then((data) => {
      onLoad({
        page,
      })
      globalDispatch({
        type: 'SET_ALERT',
        payload: { message: 'Successfully archived', type: 'success' },
      })
      setChip({ value: '', name: 'All' })
    })
    setAlertDialog({
      open: false,
    })
  }

  const onSearch = (search: string) => {
    setChip({ value: '', name: 'All' })
    setPage(1)
    onLoad({ page: 1, search })
    history.push('/users?search=' + search)
  }

  const onFilter = (chip: MyChip) => {
    setChip(chip)
    userDispatch({ type: 'SET_TOTAL', payload: 0 })
    setPage(1)
    onLoad({ page: 1 })
  }

  const chips: MyChip[] = [{ value: '', name: 'All' }]

  const isLoading = userState.isLoading && !userState.users.length

  return (
    <>
      <MyAlertDialog
        onAgree={handleArchive}
        onDisagree={() => setAlertDialog({ open: false })}
        data={alertDialog}
      />
      <MySearchField
        label='Name / Username'
        labelWidth={130}
        onSearch={onSearch}
        style={{ marginBottom: 5 }}
      />

      <MyChips
        count={userState.total}
        active={chip}
        onChipSelected={onFilter}
        chips={chips}
      />
      {isLoading && <MySkeletonCards />}
      {!isLoading && (
        <Grid
          container
          spacing={2}
          direction='column'
          justify='flex-start'
          alignItems='center'
        >
          {userState.users.map((user) => (
            <Grid key={user.id} item xs={12}>
              <UserCard onArchive={handleSelectedUser} user={user} />
            </Grid>
          ))}
          <Pagination
            style={{ marginTop: 15, marginBottom: 15 }}
            variant='outlined'
            color='primary'
            count={userState.pages}
            siblingCount={0}
            page={page}
            onChange={onPage}
          />
        </Grid>
      )}
      <Fab
        onClick={() => history.push('/users/new')}
        style={{
          position: 'fixed',
          bottom: 60,
          right: 20,
        }}
        color='primary'
        aria-label='add'
      >
        <AddIcon />
      </Fab>
    </>
  )
}

export default Users
