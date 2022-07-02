import React, { useState, useEffect, useRef } from 'react';
import { InputLabel, Select, FormControl, Container, Typography, Grid, TextField, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { apiUrl } from '../../../apiUrl';

const baseUrl = apiUrl + 'register/';

const theme = createTheme()

const idInfo = {
  name: '',
  father_lname: '',
  mother_lname: '',
  birthdate: '',
  birth_city: '',
  birth_state: 'no'
}

export default function IdCard(props) {
  const [inputs, setInputs] = useState(idInfo);
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  useEffect(() => {
    if (props.userData.birthdate) {
      props.userData.birthdate = props.userData.birthdate.slice(0,10);
    }
    if (props.userData.exam_date) {
      props.userData.exam_date = props.userData.exam_date.slice(0,10);
    }
    if (props.userData.finish_date_internship) {
      props.userData.finish_date_internship = props.userData.finish_date_internship.slice(0,10);
    }
    if (props.userData.finish_date_school) {
      props.userData.finish_date_school = props.userData.finish_date_school.slice(0,10);
    }
    if (props.userData.finish_date_social) {
      props.userData.finish_date_social = props.userData.finish_date_social.slice(0,10);
    }
    if (props.userData.start_date_internship) {
      props.userData.start_date_internship = props.userData.start_date_internship.slice(0,10);
    }
    if (props.userData.start_date_school) {
      props.userData.start_date_school = props.userData.start_date_school.slice(0,10);
    }
    if (props.userData.start_date_social) {
      props.userData.start_date_social = props.userData.start_date_social.slice(0,10);
    }
    if (props.userData.professional_id_date) {
      props.userData.professional_id_date = props.userData.professional_id_date.slice(0,10);
    }
    setInputs(props.userData);
  }, [props.userId]);

  useEffect(() => {
    props.handleUpdate(inputs, 1);
  }, [inputs]);

  function handleChange(e) {
    e.preventDefault();

    setInputs({...inputs, [e.target.name]:e.target.value});
  }

  return (
    <Container component="main" maxWidth="xs">
      {<CssBaseline />}
      <div style={{
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'}}
      >
        <Typography component="h1" variant="h5">
          Ficha de identificación
        </Typography>
        <form noValidate onChange={handleChange}
          style={{
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3)}
          }
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={inputs.name ? inputs.name : ''}
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Nombre(s)"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={inputs.father_lname ? inputs.father_lname : ''}
                variant="outlined"
                required
                fullWidth
                id="father_lname"
                label="Apellido Paterno"
                name="father_lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={inputs.mother_lname ? inputs.mother_lname : ''}
                variant="outlined"
                required
                fullWidth
                id="mother_lname"
                label="Apellido Materno"
                name="mother_lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={inputs.birthdate ? inputs.birthdate : ''}
                variant="outlined"
                required
                fullWidth
                name="birthdate"
                label="Fecha de Nacimiento"
                type="date"
                id="birthdate"
                InputLabelProps={{shrink: true}}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" >
                <InputLabel ref={inputLabel} htmlFor="standard-age-native-simple" >
                  Estado de Nacimiento
                </InputLabel>
                <Select
                  native
                  value= {inputs.birth_state ? inputs.birth_state : 'no'}
                  labelWidth={labelWidth}
                  inputProps={{
                    name: 'birth_state',
                    id: 'birth_state',
                  }}
                >
                  <option value="no">Seleccione uno...</option>
                  <option value="Aguascalientes">Aguascalientes</option>
                  <option value="Baja California">Baja California</option>
                  <option value="Baja California Sur">Baja California Sur</option>
                  <option value="Campeche">Campeche</option>
                  <option value="Chiapas">Chiapas</option>
                  <option value="Chihuahua">Chihuahua</option>
                  <option value="Coahuila">Coahuila</option>
                  <option value="Colima">Colima</option>
                  <option value="Distrito Federal">Distrito Federal</option>
                  <option value="Durango">Durango</option>
                  <option value="Estado de México">Estado de México</option>
                  <option value="Guanajuato">Guanajuato</option>
                  <option value="Guerrero">Guerrero</option>
                  <option value="Hidalgo">Hidalgo</option>
                  <option value="Jalisco">Jalisco</option>
                  <option value="Michoacán">Michoacán</option>
                  <option value="Morelos">Morelos</option>
                  <option value="Nayarit">Nayarit</option>
                  <option value="Nuevo León">Nuevo León</option>
                  <option value="Oaxaca">Oaxaca</option>
                  <option value="Puebla">Puebla</option>
                  <option value="Querétaro">Querétaro</option>
                  <option value="Quintana Roo">Quintana Roo</option>
                  <option value="San Luis Potosí">San Luis Potosí</option>
                  <option value="Sinaloa">Sinaloa</option>
                  <option value="Sonora">Sonora</option>
                  <option value="Tabasco">Tabasco</option>
                  <option value="Tamaulipas">Tamaulipas</option>
                  <option value="Tlaxcala">Tlaxcala</option>
                  <option value="Veracruz">Veracruz</option>
                  <option value="Yucatán">Yucatán</option>
                  <option value="Zacatecas">Zacatecas</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={inputs.birth_city ? inputs.birth_city : ''}
                variant="outlined"
                required
                fullWidth
                id="birth_city"
                label="Ciudad de Nacimiento"
                name="birth_city"
              />
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
