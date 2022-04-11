import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {Stepper, Step, StepLabel, Button, Typography, Grid, Container} from '@material-ui/core';
import IdCard from './steps/IdCard';
import ParticularAddress from './steps/ParticularAddress';
import MailAddress from './steps/MailAddress';
import Professional from './steps/Professional';
import history from '../../history';
import { apiUrl } from '../../apiUrl';

const baseUrl = apiUrl + 'register/';

const theme = createMuiTheme({
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

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['Ficha de identificación', 'Domicilio particular', 'Domicilio para correspondencia', 'Licenciatura'];
}

export default function InscriptionForm(props) {
  const classes = useStyles();

  const [data, setData] = useState({});
  const [user, setUser] = useState({id: '', confirmed: 0});
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [formPath, setFormPath] = useState('');
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  useEffect(() => {
    const userId = props.match.params.userId;
    const url = baseUrl + userId;
    
    axios.get(url).then(response => {
      if (response.data.user.confirmed > 4) {
        alert('Este enlace ya no es válido porque el usuario ya ha sido registrado previamente.');
        history.push('/registro');
      }

      setUser({
        id: response.data.user.id,
        confirmed: response.data.user.confirmed
      });
    }).catch(err => {
      alert('Permiso denegado, usuario no registrado.');
      history.push('/registro');
    });
  }, [props.match.params]);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <IdCard handleUpdate={handleUpdate} userId={user.id} />;
      case 1:
        return <ParticularAddress handleUpdate={handleUpdate} userId={user.id} />;
      case 2:
        return <MailAddress handleUpdate={handleUpdate} userId={user.id} />;
      case 3:
        return <Professional handleUpdate={handleUpdate} userId={user.id} />;
      default:
        return 'Unknown step';
    }
  }

  const handleNext = () => {
    const step_data = Object.assign({}, data);
    delete step_data['endpoint'];

    const apiUrl = baseUrl + user.id + data.endpoint;

    switch (data.endpoint) {
      case '':
        let newConfirmed = 0;
        if (user.confirmed > 0) {
          step_data['confirmed'] = user.confirmed;
          newConfirmed = user.confirmed;
        } else {
          step_data['confirmed'] = 1;
          newConfirmed = 1;
        }
        axios.put(apiUrl, step_data).then(response => {
          if (response.statusText === 'OK') {
            setUser({...user, confirmed: newConfirmed})
          }
        }).then(() => {
          setActiveStep(prevActiveStep => prevActiveStep + 1);
        });
        break;
      case '/address':
        if (user.confirmed === 1) {
          axios.post(apiUrl, step_data).then(response => {
            axios.put(baseUrl + user.id, {confirmed: 2}).then(response => {
              if (response.statusText === 'OK') {
                setUser({...user, confirmed: 2})
              }
            }).then(() => {
              setActiveStep(prevActiveStep => prevActiveStep + 1);
            });
          });
        } else {
          axios.put(apiUrl, step_data).then(() => {
            setActiveStep(prevActiveStep => prevActiveStep + 1);
          });
        }
        break;
      case '/mail':
        if (user.confirmed === 2) {
          axios.post(apiUrl, step_data).then(response => {
            axios.put(baseUrl + user.id, {confirmed: 3}).then(response => {
              if (response.statusText === 'OK') {
                setUser({...user, confirmed: 3})
              }
            }).then(() => {
              setActiveStep(prevActiveStep => prevActiveStep + 1);
            });
          });
        } else {
          axios.put(apiUrl, step_data).then(() => {
            setActiveStep(prevActiveStep => prevActiveStep + 1);
          });
        }
        break;
      case '/professional':
        if (user.confirmed === 3) {
          axios.post(apiUrl, step_data).then(response => {
            axios.put(baseUrl + user.id, {confirmed: 4}).then(response => {
              if (response.statusText === 'OK') {
                setUser({...user, confirmed: 4});
              }
            }).then(() => {
              axios.post(baseUrl + props.match.params.userId + '/form').then(response => {
                if (response.statusText === 'Created') {
                  setFormPath(baseUrl + props.match.params.userId + '/documents/solicitud-' + props.match.params.userId + '.pdf');
                }
              }).then(() => {
                setActiveStep(prevActiveStep => prevActiveStep + 1);
              });
            });
          });
        } else {
          axios.put(apiUrl, step_data).then(() => {
            axios.post(baseUrl + props.match.params.userId + '/form').then(response => {
              if (response.statusText === 'Created') {
                setFormPath(baseUrl + props.match.params.userId + '/documents/solicitud-' + props.match.params.userId + '.pdf');
              }
            }).then(() => {
              setActiveStep(prevActiveStep => prevActiveStep + 1);
            });
          });
        }
        break;
      default:

    }

    setSubmitDisabled(true);
    //setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function handleUpdate(cb_data) {
    console.log(cb_data);
    setData(cb_data);

    const step_data = Object.assign({}, cb_data);
    delete step_data['endpoint'];

    const values = Object.values(step_data);

    const notEmpty = values.every(item => item !== '');
    const notNull = values.every(item => item !== null);

    if (notEmpty && notNull && values.length > 0) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }

  function handleFinish() {
    axios.put(baseUrl + user.id, {confirmed: 5}).then(response => {
      if (response.statusText === 'OK') {
        setUser({...user, confirmed: 5});
      }
    });
  }

  return (
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps = {};
              const labelProps = {};

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <Container>
                <Typography variant="h4" gutterBottom>Instrucciones</Typography>
                <Typography className={classes.instructions}>
                  1. Revisa que todos los datos se hayan ingresado correctamente.
                </Typography>
                <Typography className={classes.instructions}>
                  2. Si necesitas corregir algo presiona el botón reiniciar.
                </Typography>
                <Typography className={classes.instructions}>
                  3. Si todo está correcto, descarga el formato, imprímelo, fírmalo
                  y escanéalo, la siguiente vez que entres a la plataforma podrás subirlo.
                </Typography>
                <Typography className={classes.instructions}>
                  También deberás presentar este documento en original el día del examen.
                </Typography>

                <object width="100%" height="500" data={formPath} type="application/pdf">   </object>

                <div align="center">

                  <Button onClick={handleReset} className={classes.button}>
                    Reiniciar
                  </Button>
                  <Button href={formPath} className={classes.button} download target="_blank">
                    Descargar
                  </Button>
                  <Button onClick={handleFinish} href="http://app.comgecey.org/signin" className={classes.button}>
                    Terminar
                  </Button>
                </div>
              </Container>
            ) : (
              <div>
                <Typography variant={'inherit'} className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                <br />
                <Grid container direction="row" justify="center">
                  <Grid item>
                  <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                    Regresar
                  </Button>

                  <Button
                    disabled={submitDisabled}
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Revisar' : 'Siguiente'}
                  </Button>
                  </Grid>
                </Grid>
              </div>
            )}
          </div>
        </div>
      </ThemeProvider>
  );
}
