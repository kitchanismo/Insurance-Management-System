import React, { useContext } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Nav from 'components/common/MyNav'
import MyAlert from 'components/common/MyAlert'
import Layout from 'components/layout'
import { ClientProvider } from 'providers/ClientProvicer'
import { EmployeeProvider } from 'providers/EmployeeProvider'
import { GlobalContext } from 'providers'

const App: React.FC = (props) => {
  const [state] = useContext(GlobalContext)!
  return (
    <>
      <CssBaseline />
      <MyAlert />
      {state.isAuthenticUser && <Nav />}
      <EmployeeProvider>
        <ClientProvider>
          <Layout />
        </ClientProvider>
      </EmployeeProvider>
    </>
  )
}

export default App
