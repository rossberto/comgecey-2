import React from 'react';
import {Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button} from '@material-ui/core';

export default function DocumentsDialog(props) {
  return (
    <Dialog onClose={props.closeDialog} open={props.open}>
      <DialogTitle align="center">
        <Typography align="center" variant="h4" component="h3" gutterBottom style={{alignItems:'center'}}>Gracias</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography component="h4" variant="h5">
          Tu correo se ha agregado exitosamente.
        </Typography>
      </DialogContent>
      <DialogActions align="justify-between" className="justify-between pl-16">
        <Button
          //type="submit"
          variant="contained"
          onClick={props.closeDialog}
        >
          Entendido
        </Button>
      </DialogActions>
    </Dialog>
  );
}
