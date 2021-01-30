import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Nav from 'components/common/Nav'
import MyAlert from 'components/common/Alert'
import Layout from 'components/layout'
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
