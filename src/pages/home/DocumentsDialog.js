import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button} from '@mui/material';


export default function DocumentsDialog(props) {

  const bull = <span >•</span>;

  return (
    <Dialog onClose={props.closeDialog} open={props.open}>
      <DialogTitle align="center">
        <Typography align="center" variant="h4" component="h3" gutterBottom style={{alignItems:'center'}}>Documentos</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography component="h4" variant="h5">
          Los siguientes documentos se deberán subir a la plataforma en formato PDF:
        </Typography>
        <br />
        <Typography component="h1" variant="h5">
          {bull} CURP
        </Typography>
        <Typography component="h1" variant="h5">
          {bull} RFC
        </Typography>
        <Typography component="h1" variant="h5">
          {bull} Comprobante de Domicilio
        </Typography>
        <Typography component="h1" variant="h5">
          {bull} Título de Médico Cirujano
        </Typography>
        <Typography component="h1" variant="h5">
          {bull} Cédula Profesional
        </Typography>
        <Typography component="h1" variant="h5">
          {bull} Comprobante de Ejercicio Profesional
        </Typography>
        <Typography component="h1" variant="h5">
          {bull} Comprobante de Pago
        </Typography>
        <br />
        <Typography component="h4" variant="h5">
          El día del examen se deberán entregar dos fotografías recientes, tamaño diploma (5x7cm) y una infantil en blanco y negro.
        </Typography>
      </DialogContent>
      <DialogActions align="justify-between" className="justify-between pl-16">
      <Button
        variant="contained"
        onClick={props.closeDialog}
      >
        Entendido
      </Button>
      </DialogActions>
    </Dialog>
  );
}
