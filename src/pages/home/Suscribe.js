import React, { useState } from 'react';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {TextField, Paper, Typography, Button} from '@material-ui/core';
import { amber } from '@material-ui/core/colors';
import axios from 'axios';
import SuscribeDialog from './SuscribeDialog';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  calltoaction: {
    padding: '30px',
    background: '#7a6800ff',
    color: 'white'
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: amber,
  },
});

export default function Suscribe() {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [canBeSubmitted, setCanBeSubmitted] = useState(false);
  const [open, setOpen] = useState(false);

  function handleChange(e) {
    const email = e.target.value;
    setEmail(email);

    if (email.includes('@')) {
      setCanBeSubmitted(true);
    } else {
      setCanBeSubmitted(false);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios.post('https://api.comgecey.org/api/newsletter/suscribers', {email: email}).then((response) => {
      if (response.status === 201) {
        setEmail('');
        setOpen(true);
      }
    }).catch(() => {
      setEmail('');
      alert('Ha ocurrido un error, vuelva a intentarlo en unos minutos. Si el problema persiste, es posible que haya registrado la misma dirección de correo electrónico con anterioridad.');
    });
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Paper className={classes.calltoaction} style={{backgroundColor: '#7a6800ff', padding: '100px'}}>
      <center>
        <Typography variant="h4">
          Suscríbete a nuestro boletín para estar enterado de las próximas convocatorias y eventos.
        </Typography>
      <br />
      <ThemeProvider theme={theme}>
        <form onSubmit={handleSubmit}>
          <TextField
            value={email}
            onChange={handleChange}
            variant="outlined"
            style={{alignItems: 'center', backgroundColor: 'white', marginBottom: '10px', marginRight: '15px'}}
            id="standard-basic"
            placeholder="Correo Electrónico"
          />
          <Button
            type="submit"
            disabled={!canBeSubmitted}
            variant="outlined"
            style={{alignItems: 'center', margin: '10px', color: 'white', backgroundColor: '#111f22ff', marginLeft: '15px'}}
          >
            Suscribirme
          </Button>
        </form>
      </ThemeProvider>
      </center>
      <SuscribeDialog open={open} closeDialog={handleClose} />
    </Paper>
  );
}
