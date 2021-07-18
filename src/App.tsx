import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import MyAlert from 'components/common/MyAlert'
import GlobalProvider from 'providers/GlobalProvider'
import DependencyProvider from 'providers/DependencyProvider'

const App: React.FC = (props) => {
  return (
    <>
      <GlobalProvider>
        <CssBaseline />
        <MyAlert />
        <DependencyProvider />
      </GlobalProvider>
    </>
  )
}

export default App
