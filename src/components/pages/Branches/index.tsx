import Grid from '@material-ui/core/Grid'
import { BranchContext } from 'providers/BranchProvider'
import { useContext, useEffect, useState } from 'react'
import { archiveBranch, getBranches } from 'services/branchService'
import BranchCard from './BranchCard'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { useHistory } from 'react-router-dom'
import MySearchField from 'components/common/MySearchField'
import { GlobalContext } from 'providers/GlobalProvider'
import MyAlertDialog, { AlertDataProps } from 'components/common/MyAlertDialog'
import Branch from 'models/branch'
import MySkeletonCards from 'components/common/MySkeletonCards'

export interface BranchesProps {}

const Branches: React.SFC<BranchesProps> = () => {
  const [branchState, branchDispatch] = useContext(BranchContext)!

  const [globalState, globalDispatch] = useContext(GlobalContext)!

  const history = useHistory()

  useEffect(() => {
    globalDispatch({ type: 'SET_TITLE', payload: 'Branch Management' })
    onLoad()
    return () => {
      globalDispatch({ type: 'SET_IS_LOADING', payload: false })
    }
  }, [])

  const onLoad = (search?: string) => {
    globalDispatch({ type: 'SET_IS_LOADING', payload: true })
    branchDispatch({ type: 'SET_IS_LOADING', payload: true })
    getBranches(search)
      .then((branches) => {
        branchDispatch({
          type: 'ON_LOAD_BRANCHES',
          payload: branches,
        })
        globalDispatch({ type: 'SET_IS_LOADING', payload: false })
      })
      .catch(() => globalDispatch({ type: 'SET_IS_LOADING', payload: false }))
  }

  const onSearch = (value: string) => {
    onLoad(value)
  }

  const [alertDialog, setAlertDialog] = useState<AlertDataProps>({})

  const [branch, setBranch] = useState<Branch>()

  const handleSelectedClient = (branch: Branch) => {
    setBranch(branch)
    setAlertDialog({
      open: true,
      text: `Are you sure you want to archive ${branch.name}?`,
      description:
        'Archieving will not permanently delete the branch account in the database.',
    })
  }

  const handleArchieve = () => {
    archiveBranch(branch?.id!).then((data) => {
      onLoad()
      globalDispatch({
        type: 'SET_ALERT',
        payload: { message: 'Successfully archived', type: 'error' },
      })
    })
    setAlertDialog({
      open: false,
    })
  }

  const isLoading = branchState.isLoading && !branchState.branches.length

  return (
    <>
      <MyAlertDialog
        onAgree={handleArchieve}
        onDisagree={() => setAlertDialog({ open: false })}
        data={alertDialog}
      />
      <MySearchField onSearch={onSearch} style={{ marginBottom: 20 }} />
      {isLoading && <MySkeletonCards />}
      {!isLoading && (
        <Grid
          container
          spacing={2}
          direction='column'
          justify='flex-start'
          alignItems='center'
        >
          {branchState.branches.map((branch) => (
            <Grid key={branch.id} item xs={12}>
              <BranchCard
                onArchive={handleSelectedClient}
                branch={branch}
              ></BranchCard>
            </Grid>
          ))}
        </Grid>
      )}

      <Fab
        style={{
          position: 'fixed',
          bottom: 60,
          right: 20,
        }}
        onClick={() => history.push('/branches/new')}
        color='primary'
        aria-label='add'
      >
        <AddIcon />
      </Fab>
    </>
  )
}

export default Branches
