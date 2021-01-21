import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'
import { Nav } from 'components/Common/MyNav'
import { MyAlert } from 'components/Common/MyAlert'
import { Layout } from 'components/Layout'

const App: React.FC = (props) => {
  return (
    <>
      <CssBaseline />
      <MyAlert />
      <Nav />
      <Layout />
    </>
  )
}

export default App
