import React from 'react'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import makeStyles from '@material-ui/core/styles/makeStyles'
import { Nav } from 'components/Common/MyNav'
import { MyAlert } from 'components/Common/MyAlert'
import { Layout } from 'components/Layout'

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
