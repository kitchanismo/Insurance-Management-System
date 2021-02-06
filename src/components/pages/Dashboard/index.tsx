import { GlobalContext } from 'providers/GlobalProvider'
import React, { useContext, useEffect } from 'react'

export interface DashboardProps {}

const Dashboard: React.SFC<DashboardProps> = () => {
  const [state, dispatch] = useContext(GlobalContext)!

  useEffect(() => {
    dispatch({ type: 'SET_TITLE', payload: 'Dashboard' })
  }, [])
  return <h3>Under Construction</h3>
}

export default Dashboard
