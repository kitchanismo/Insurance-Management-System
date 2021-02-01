import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Nav from 'components/common/MyNav'
import MyAlert from 'components/common/MyAlert'
import Layout from 'components/layout'
import { ClientProvider } from 'providers/ClientProvicer'
import { EmployeeProvider } from 'providers/EmployeeProvider'

const App: React.FC = (props) => {
  return (
    <>
      <CssBaseline />
      <MyAlert />
      <Nav />
      <EmployeeProvider>
        <ClientProvider>
          <Layout />
        </ClientProvider>
      </EmployeeProvider>
    </>
  )
}

export default App
