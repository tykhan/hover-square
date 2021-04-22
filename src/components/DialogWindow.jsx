import React from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Typography
} from '@material-ui/core';

export const DialogWindow = ({
  isDialogOpen,
  setIsDialogOpen,
  handleFinishGame,
  dialogTitle,
  dialogContent,
}) => {

  return (
    <Dialog
      open={isDialogOpen}
      keepMounted
      onClose={() => setIsDialogOpen(false)}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-title">
        {dialogContent}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {dialogTitle}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsDialogOpen(false)} color="primary">
          <Typography>Continue</Typography>
        </Button>
        <Button
          onClick={() => {
            handleFinishGame()
            setIsDialogOpen(false)
          }}
          color="secondary"
        >
          <Typography>Finish</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  )
}
