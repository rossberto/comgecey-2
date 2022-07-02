import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
// import { makeStyles, createMuiTheme, ThemeProvider } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {Stepper, Step, StepLabel, Button, Typography, Grid, Container} from '@mui/material';
import IdCard from './steps/IdCard';
import ParticularAddress from './steps/ParticularAddress';
import MailAddress from './steps/MailAddress';
import Professional from './steps/Professional';
import history from '../../history';
import { apiUrl } from '../../apiUrl';

const baseUrl = apiUrl + 'register/';

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


const expected_data = {
  1: ['name', 'father_lname', 'mother_lname', 'birthdate', 'birth_state', 'birth_city'],
  2: ['street', 'number', 'town', 'city', 'state', 'zip_code', 'phone'],
  3: ['mail_street', 'mail_number', 'mail_town', 'mail_city', 'mail_state', 'mail_zip_code', 'mail_phone'],
  4: ['school', 'start_date_school', 'finish_date_school', 'internship', 'start_date_internship', 'finish_date_internship', 'social_service', 'start_date_social_service', 'finish_date_social_service', 'exam_date', 'exam_type', 'thesis', 'professional_id', 'professional_id_date', 'book', 'ssa']
}

function getSteps() {
  return ['Ficha de identificación', 'Domicilio particular', 'Domicilio para correspondencia', 'Licenciatura'];
}

export default function InscriptionForm(props) {
  const { userId } = useParams();
  const [data, setData] = useState({});
  const [user, setUser] = useState({id: '', confirmed: 0});
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [formPath, setFormPath] = useState('');
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  useEffect(() => {
    const url = baseUrl + userId;
    
    axios.get(url).then(response => {
      if (response.data.user.confirmed == 1) {
        alert('Este enlace ya no es válido porque el usuario ya ha sido registrado previamente.');
        history.push('/registro');
      }

      setUser({
        id: response.data.user.id,
        confirmed: response.data.user.confirmed
      });

      const userdata = response.data.user

      if (userdata.birthdate) {
        userdata.birthdate = userdata.birthdate.slice(0,10);
      }

      if (userdata.exam_date) {
        userdata.exam_date = userdata.exam_date.slice(0,10);
      }
      if (userdata.finish_date_internship) {
        userdata.finish_date_internship = userdata.finish_date_internship.slice(0,10);
      }
      if (userdata.finish_date_school) {
        userdata.finish_date_school = userdata.finish_date_school.slice(0,10);
      }
      if (userdata.finish_date_social) {
        userdata.finish_date_social = userdata.finish_date_social.slice(0,10);
      }
      if (userdata.start_date_internship) {
        userdata.start_date_internship = userdata.start_date_internship.slice(0,10);
      }
      if (userdata.start_date_school) {
        userdata.start_date_school = userdata.start_date_school.slice(0,10);
      }
      if (userdata.start_date_social) {
        userdata.start_date_social = userdata.start_date_social.slice(0,10);
      }
      if (userdata.professional_id_date) {
        userdata.professional_id_date = userdata.professional_id_date.slice(0,10);
      }

      setData(response.data.user)

    }).catch(err => {
      alert('Permiso denegado, usuario no registrado.');
      history.push('/registro');
    });
  }, [userId]);

  function getStepContent(step) {
    switch (step) {
      case 0:
        return  <IdCard handleUpdate={evt => handleUpdate(evt, 1)} userId={user.id} userData={data} />;
      case 1:
        return <ParticularAddress handleUpdate={evt => handleUpdate(evt, 2)} userId={user.id} userData={data}/>;
      case 2:
        return <MailAddress handleUpdate={evt => handleUpdate(evt, 3)} userId={user.id} userData={data}/>;
      case 3:
        return <Professional handleUpdate={evt => handleUpdate(evt, 4)} userId={user.id} userData={data}/>;
      default:
        return <h1>¡Oops! Algo salió mal, intenta ingresar más tarde.</h1>;
    }
  }

  const handleNext = () => {
    const step_data = Object.assign({}, data);

    const apiUrl = baseUrl + user.id;
    axios.put(apiUrl, step_data).then(() => {
      if (activeStep === 3) {
        axios.post(baseUrl + user.id + '/form').then(response => {
          console.log(response)
          if (response.statusText === 'Created') {
            setFormPath(baseUrl + user.id + '/documents/solicitud-' + user.id + '.pdf');
          }
        }).then(() => {
          setActiveStep(prevActiveStep => prevActiveStep + 1);
        })
      } else {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
        // if (activeStep === 2)
      }
    });
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
    setData({...data, confirmed: 0});
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function handleUpdate(cb_data, step_number) {
    setData(cb_data);

    const step_data = Object.assign({}, cb_data);
    delete step_data['endpoint'];

    const notNull = expected_data[step_number].every(field => cb_data[field] !== null)
    const notEmpty = expected_data[step_number].every(field => cb_data[field] !== '')

    const values = Object.values(step_data);

    if (notEmpty && notNull && values.length > 0) {
      setSubmitDisabled(false);
      if (activeStep === 3) {
        setData({...data, confirmed: 1});
      }
    } else {
      setSubmitDisabled(true);
      setData({...data, confirmed: 0});
    }
  }

  function handleFinish() {
    axios.put(baseUrl + user.id, {confirmed: 1}).then(response => {
      if (response.statusText === 'OK') {
        setData({...data, confirmed: 1});
      }
    });
  }

  return (
      <ThemeProvider theme={theme} >
      <CssBaseline />
        <div style={{margin:"20px"}}>
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
                <Typography 
                  sx={{marginTop: theme.spacing(1), marginBottom: theme.spacing(1)}}>
                  1. Revisa que todos los datos se hayan ingresado correctamente.
                </Typography>

                <br />
                <iframe src={formPath} width="100%" height="500px"></iframe>
                <br />

                <Typography
                  sx={{marginTop: theme.spacing(1), marginBottom: theme.spacing(1)}}>
                  2. Si necesitas corregir algo presiona el botón REINICIAR.
                </Typography>
                <Typography
                  sx={{marginTop: theme.spacing(1), marginBottom: theme.spacing(1)}}>
                  3. Si todo está correcto, descarga el formato. Más adelante deberás imprimirlo, firmarlo y escanearlo para subirlo a la plataforma.
                </Typography>
                <Typography
                  sx={{marginTop: theme.spacing(1), marginBottom: theme.spacing(1)}}>
                  4. Haz clic en FINALIZAR.
                </Typography>

                <div align="center">

                  <Button onClick={handleReset} sx={{marginRight: theme.spacing(1)}}>
                    Reiniciar
                  </Button>
                  <Button onClick={handleFinish} 
                    href="http://app.comgecey.org/signin" 
                    sx={{marginRight: theme.spacing(1)}}
                  >
                    Finalizar
                  </Button>
                </div>
              </Container>
            ) : (
              <div>
                <Typography variant={'inherit'}>{getStepContent(activeStep)}</Typography>
                <br />
                <Grid container direction="row" justifyContent="center">
                  <Grid item>
                  <Button disabled={activeStep === 0} onClick={handleBack} 
                    sx={{marginRight: theme.spacing(1)}}
                  >
                    Regresar
                  </Button>

                  <Button
                    disabled={submitDisabled}
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    sx={{marginRight: theme.spacing(1)}}
                    
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