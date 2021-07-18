import React, { useContext, useEffect } from 'react'
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
import { NotificationProvider } from 'providers/NotificationProvider'
import wave from 'assets/wave.svg'
import { UserProvider } from 'providers/UserProvider'
import MyNavFooter from 'components/common/MyNavFooter'
import { StatisticProvider } from 'providers/StatisticProvider'

export interface DependencyProviderProps {}

const DependencyProvider: React.SFC<DependencyProviderProps> = () => {
  const [state, dispatch] = useContext(GlobalContext)!

  return (
    <>
      {!state.currentUser && (
        <img
          style={{ position: 'absolute', top: 0 }}
          width='100%'
          src={wave}
          alt='wave logo'
        />
      )}
      {state.currentUser && <Nav />}
      <BranchProvider>
        <UserProvider>
          <EmployeeProvider>
            <ClientProvider>
              <PaymentProvider>
                <CommissionProvider>
                  <StatisticProvider>
                    <NotificationProvider>
                      <Layout />
                      {state.currentUser && <MyNavFooter />}
                    </NotificationProvider>
                  </StatisticProvider>
                </CommissionProvider>
              </PaymentProvider>
            </ClientProvider>
          </EmployeeProvider>
        </UserProvider>
      </BranchProvider>
    </>
  )
}

export default DependencyProvider
