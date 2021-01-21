import React, { useContext, useState } from 'react'
import { Nav } from 'components/Common/MyNav'
import Container from '@material-ui/core/Container'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Layout } from 'components/Layout'
import CssBaseline from '@material-ui/core/CssBaseline'
import { MyAlert } from 'components/Common/MyAlert'

const App: React.FC = (props) => {
  const styles = useStyles()

  return (
    <>
      <CssBaseline />
      <MyAlert />
      <Nav></Nav>
      <Container maxWidth='xs' className={styles.container}>
        <Layout />
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
