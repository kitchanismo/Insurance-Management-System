import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Nav from 'components/common/MyNav'
import MyAlert from 'components/common/MyAlert'
import Layout from 'components/container'
import { ClientProvider } from 'providers/ClientProvicer'

const App: React.FC = (props) => {
  return (
    <>
      <CssBaseline />
      <MyAlert />
      <Nav />
      <ClientProvider>
        <Layout />
      </ClientProvider>
    </>
  )
}

export default App
