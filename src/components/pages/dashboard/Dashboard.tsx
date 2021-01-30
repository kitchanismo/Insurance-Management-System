import { GlobalContext } from 'hooks/useGlobalState'
import React, { useContext, useEffect } from 'react'

export interface DashboardProps {}

export const Dashboard: React.SFC<DashboardProps> = () => {
  const [state, dispatch] = useContext(GlobalContext)!

  useEffect(() => {
    dispatch({ type: 'setTitle', payload: 'Dashboard' })
  }, [])
  return <h3>Dashboard</h3>
}
