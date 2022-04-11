import React from 'react';
import { makeStyles } from '@mui/material/styles';
import { Paper, Typography, Button, Grid } from '@mui/material';
import logo from './images/comgecey_logo-1.png';
import logos from './images/logos.png';


export default function CallToAction() {
  // const classes = useStyles();

  return (
    <Paper>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item margin="12px 12px">
        <center>
          <img position="contain" maxWidth="400px" src={logo} alt="comgecey-icon" margin="10px 10px" />
          </center>
        </Grid>
        <Grid item>
        <Typography variant="h2" component="h2"><center>Convocatoria Abierta</center></Typography>
              <Typography variant="h3"><center>Próximo Examen de Certificación</center></Typography>
              <Typography variant="h3"><center>26 de Junio del 2022</center></Typography>
              <br />
          <center>
            <Typography variant="h4">Fecha límite de inscripción: 30 de Mayo.</Typography>
          </center>
        </Grid>
        </Grid>
    </Paper>
  );
}
