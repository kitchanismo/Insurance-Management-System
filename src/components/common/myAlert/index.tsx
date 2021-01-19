import React, { useContext } from 'react'

import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import GlobalContext, { GlobalProps } from 'providers/contexts/globalContext'
export interface MyAlertProps {}

const MyAlert: React.SFC<MyAlertProps> = () => {
  const { alert, setAlert } = useContext<GlobalProps>(GlobalContext)

  return (
    alert && (
      <Snackbar
      
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={!!alert}
        autoHideDuration={3000}
        onClose={() => setAlert(null)}
      >
        <Alert
          variant='filled'
          onClose={() => setAlert(null)}
          severity={alert.type}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    )
  )
}

export default MyAlert
