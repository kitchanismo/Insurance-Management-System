import React, { useContext, useState } from 'react'
import Nav from 'components/common/nav'

import Container from '@material-ui/core/Container'
import makeStyles from '@material-ui/core/styles/makeStyles'
import Typography from '@material-ui/core/Typography'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import GlobalContext, { GlobalProps } from 'providers/contexts/globalContext'
import MyDrawer from 'components/common/myDrawer'
import MyForm from 'components/common/myForm'
import Routes from 'components/routes'

const App: React.FC = (props) => {
  const styles = useStyles()
  const { setIsDark } = useContext<GlobalProps>(GlobalContext)

  return (
    <>
      <Nav></Nav>
      <Container maxWidth='xs' className={styles.container}>
        <Routes></Routes>
        <Fab
          onClick={() => setIsDark((isDark) => !isDark)}
          className={styles.fab}
          color='secondary'
          aria-label='add'
        >
          <AddIcon />
        </Fab>
      </Container>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 20,
    height: '100%',
    backgroundColor: theme.palette.background.default,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))

export default App
