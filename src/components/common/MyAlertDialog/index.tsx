import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { ToggleCheckBoxOutlineBlank } from 'material-ui/svg-icons'

export interface AlertDataProps {
  open?: boolean
  text?: string
  description?: string
}

interface MyAlertDialogProps {
  data: AlertDataProps
  onAgree?: () => void
  onDisagree?: () => void
}

export const MyAlertDialog: React.FC<MyAlertDialogProps> = ({
  data: { open, text, description },
  onAgree,
  onDisagree,
}) => {
  return (
    <div>
      {open && (
        <Dialog
          open={open || false}
          onClose={onDisagree}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>{text}</DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              {description}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onDisagree} color='default'>
              Cancel
            </Button>
            <Button
              style={{ marginRight: 10 }}
              onClick={onAgree}
              color='secondary'
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  )
}

export default MyAlertDialog
