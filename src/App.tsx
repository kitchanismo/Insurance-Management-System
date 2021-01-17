import React from 'react'
import Nav from 'components/common/nav'
import Provider from 'providers'

const App: React.FC = (props) => (
  <Provider>
    <Nav></Nav>
  </Provider>
)

export default App
