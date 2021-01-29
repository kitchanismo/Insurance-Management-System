import GlobalContext from 'contexts/globalContext'
import React, { useContext, useEffect } from 'react'

export interface DashboardProps {}

export const Dashboard: React.SFC<DashboardProps> = () => {
  const globalCtx = useContext(GlobalContext)

  useEffect(() => {
    globalCtx?.setTitle('Employee Management')
  }, [])
  return <h3>Dashboard</h3>
}
