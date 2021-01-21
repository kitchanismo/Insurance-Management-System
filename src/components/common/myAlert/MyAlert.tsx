import React, { useContext } from 'react'

import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import GlobalContext, { GlobalProps } from 'providers/contexts/globalContext'
export interface MyAlertProps {}

export const MyAlert: React.SFC<MyAlertProps> = () => {
  const ctx = useContext(GlobalContext)

  return (
    ctx &&
    ctx.alert && (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={!!ctx?.alert}
        autoHideDuration={3000}
        onClose={() => ctx.setAlert(null)}
      >
        <Alert
          variant='filled'
          onClose={() => ctx.setAlert(null)}
          severity={ctx.alert.type}
        >
          {ctx.alert.message}
        </Alert>
      </Snackbar>
    )
  )
}
