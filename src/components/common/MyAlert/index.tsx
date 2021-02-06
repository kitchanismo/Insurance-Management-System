import React, { useContext } from 'react'

import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { GlobalContext } from 'providers/GlobalProvider'

export interface MyAlertProps {}

const MyAlert: React.SFC<MyAlertProps> = () => {
  const [state, dispatch] = useContext(GlobalContext)!

  return (
    state.alert && (
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={!!state.alert}
        autoHideDuration={3000}
        onClose={() => dispatch({ type: 'HIDE_ALERT' })}
      >
        <Alert
          variant='filled'
          onClose={() => dispatch({ type: 'HIDE_ALERT' })}
          severity={state.alert.type}
        >
          {state.alert.message}
        </Alert>
      </Snackbar>
    )
  )
}

export default MyAlert
