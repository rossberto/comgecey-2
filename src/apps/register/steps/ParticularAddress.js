import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Select, FormControl, InputLabel, Container, Typography, Grid, TextField, CssBaseline } from '@mui/material';
import { apiUrl } from '../../../apiUrl';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const baseUrl = apiUrl + 'register/';

const addressInfo = {
  street: '',
  number: '',
  town: '',
  city: '',
  state: '',
  zip_code: '',
  phone: ''
}

const theme = createTheme()

export default function ParticularAddress(props) {
  const [inputs, setInputs] = useState(addressInfo);
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  useEffect(() => {
    setInputs(props.userData);
  }, [props.userId]);

  useEffect(() => {
    props.handleUpdate(inputs);
  }, [inputs]);

  function handleChange(e) {
    e.preventDefault();

    setInputs({...inputs, [e.target.name]:e.target.value});
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div style={{
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'}}
      >
        <Typography component="h1" variant="h5">
          Domicilio particular
        </Typography>
        <form noValidate onChange={handleChange}
          style={{
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3)}
          }
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <TextField
                value={inputs.street}
                name="street"
                variant="outlined"
                required
                fullWidth
                id="street"
                label="Calle"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                value={inputs.number}
                variant="outlined"
                required
                fullWidth
                id="number"
                label="N??mero Ext./Int."
                name="number"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={inputs.town}
                variant="outlined"
                required
                fullWidth
                id="town"
                label="Colonia"
                name="town"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={inputs.city}
                variant="outlined"
                required
                fullWidth
                name="city"
                label="Ciudad"
                id="city"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                  Estado
                </InputLabel>
                <Select
                  native
                  value={inputs.state}
                  labelWidth={labelWidth}
                  inputProps={{
                    name: 'state',
                    id: 'state',
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
                  <option value="Estado de M??xico">Estado de M??xico</option>
                  <option value="Guanajuato">Guanajuato</option>
                  <option value="Guerrero">Guerrero</option>
                  <option value="Hidalgo">Hidalgo</option>
                  <option value="Jalisco">Jalisco</option>
                  <option value="Michoac??n">Michoac??n</option>
                  <option value="Morelos">Morelos</option>
                  <option value="Nayarit">Nayarit</option>
                  <option value="Nuevo Le??n">Nuevo Le??n</option>
                  <option value="Oaxaca">Oaxaca</option>
                  <option value="Puebla">Puebla</option>
                  <option value="Quer??taro">Quer??taro</option>
                  <option value="Quintana Roo">Quintana Roo</option>
                  <option value="San Luis Potos??">San Luis Potos??</option>
                  <option value="Sinaloa">Sinaloa</option>
                  <option value="Sonora">Sonora</option>
                  <option value="Tabasco">Tabasco</option>
                  <option value="Tamaulipas">Tamaulipas</option>
                  <option value="Tlaxcala">Tlaxcala</option>
                  <option value="Veracruz">Veracruz</option>
                  <option value="Yucat??n">Yucat??n</option>
                  <option value="Zacatecas">Zacatecas</option>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={inputs.zip_code}
                variant="outlined"
                required
                fullWidth
                name="zip_code"
                label="C??digo Postal"
                id="zip_code"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={inputs.phone}
                variant="outlined"
                required
                fullWidth
                name="phone"
                label="N??mero telef??nico"
                id="phone"
              />
            </Grid>

          </Grid>
        </form>
      </div>
    </Container>
  );
}
