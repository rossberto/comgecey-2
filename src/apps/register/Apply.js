import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Typography, Box, Grid, Paper, Link, TextField, Button} from '@mui/material';
import { makeStyles } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from './comgecey-02lr2.png'
import { apiUrl } from '../../apiUrl';

const baseUrl = apiUrl + 'register';

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#111f22',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#0044ff',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Comgecey
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function Apply() {
  // const classes = useStyles();
  const [canBeSubmitted, setCanBeSubmitted] = useState(false);
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    confirm: ''
  });

  useEffect(() => {
    if ((inputs.email.includes('@')) &&
        (inputs.password.length>3) &&
        (inputs.password.length===inputs.confirm.length) &&
        (inputs.email.length>=5)) {
      setCanBeSubmitted(false)
    } else {
      setCanBeSubmitted(true)
    }
  }, [inputs]);

  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    setInputs({...inputs, [key]:value})
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (inputs.confirm===inputs.password) {
      axios.post(baseUrl, {email: inputs.email, password: inputs.password}).then((response) => {
        if (response.status === 201) {
          alert('Te hemos enviado un correo de confirmación.\n\nSi no ves el correo en la bandeja principal, por favor revisa en tu carpeta de spam o correo no deseado.');
        } else {
          alert('El correo electrónico ingresado ya ha sido registrado anteriormente.');
        }
      }).catch((err) => {
        alert('Hubo un error en el servidor, favor de intentarlo más tarde.');
      });
    } else {
      alert('Contraseña no coincide con la confirmación.');
    }
  }

  return (
    <ThemeProvider theme={theme}>
    <Grid container component="main" sx={{height: '100vh'}}>
      <Grid 
        container
        item xs={12}
        sm={6}
        md={7} 
        sx={{ backgroundImage: `url(${logo})`,
              backgroundRepeat: 'no-repeat',
              backgroundColor:
                theme.palette.type === 'dark' ? 
                theme.palette.grey[900] : 
                theme.palette.grey[50],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              maxHeight: '1000px'
            }} >
      </Grid>
      <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square>
        <div style={{ margin: theme.spacing(4, 4),
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
        >
          <Typography component="h1" variant="h5">
            Inicia hoy mismo tu registro.
          </Typography>
          <form noValidate onChange={handleChange} onSubmit={handleSubmit} sx={{width: '100%'}}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              label="Contraseña"
              name="password"
              autoComplete="email"
              autoFocus
              type="password"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirm"
              label="Confirmar Contraseña"
              id="confirm"
              autoComplete="current-password"
              type="password"
            />
            <Button
              type="submit"
              //href="/datos/1"
              fullWidth
              variant="contained"
              color="primary"
              sx={{margin: theme.spacing(3, 0, 2)}}
              disabled={canBeSubmitted}
            >
              Registrarme
            </Button>

            <Link href="http://app.comgecey.org/signin" variant="body2">
              ¿Ya tienes una cuenta? Ingresa aquí.
            </Link>

            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
    </ThemeProvider>
  );
}
