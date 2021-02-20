import React, { useContext } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import Nav from 'components/common/MyNav'
import MyAlert from 'components/common/MyAlert'
import Layout from 'components/layout'
import { ClientProvider } from 'providers/ClientProvider'
import { EmployeeProvider } from 'providers/EmployeeProvider'
import { GlobalContext } from 'providers/GlobalProvider'
import { PaymentProvider } from 'providers/PaymentProvider'
import { BranchProvider } from 'providers/BranchProvider'
import { CommissionProvider } from 'providers/CommissionProvider'

const App: React.FC = (props) => {
  const [state] = useContext(GlobalContext)!
  return (
    <>
      <CssBaseline />
      <MyAlert />
      {state.currentUser && <Nav />}
      <BranchProvider>
        <EmployeeProvider>
          <ClientProvider>
            <PaymentProvider>
              <CommissionProvider>
                <Layout />
              </CommissionProvider>
            </PaymentProvider>
          </ClientProvider>
        </EmployeeProvider>
      </BranchProvider>
    </>
  )
}

export default App
