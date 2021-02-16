import React, { useContext } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Nav from 'components/common/MyNav'
import MyAlert from 'components/common/MyAlert'
import Layout from 'components/layout'
import { ClientProvider } from 'providers/ClientProvider'
import { EmployeeProvider } from 'providers/EmployeeProvider'
import { GlobalContext } from 'providers/GlobalProvider'
import { PaymentProvider } from 'providers/PaymentProvider'

const App: React.FC = (props) => {
  const [state] = useContext(GlobalContext)!
  return (
    <>
      <CssBaseline />
      <MyAlert />

      {state.isAuthenticUser && <Nav />}
      <EmployeeProvider>
        <ClientProvider>
          <PaymentProvider>
            <Layout />
          </PaymentProvider>
        </ClientProvider>
      </EmployeeProvider>
    </>
  )
}

export default App
