import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Grid, TextField, CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { apiUrl } from '../../../apiUrl';

const baseUrl = apiUrl + 'register/';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const professionalInfo = {
  endpoint: '/professional',
  school: '',
  start_date: '',
  finish_date: '',
  intership: '',
  start_date_internship: '',
  finish_date_internship: '',
  social_service: '',
  start_date_social: '',
  finish_date_social: '',
  exam_date: '',
  exam_type: '',
  tesis: '',
  professional_id: '',
  professional_id_date: '',
  book: '',
  ssa: ''
}

export default function Profesional(props) {
  const classes = useStyles();

  const [inputs, setInputs] = useState(professionalInfo);

  useEffect(() => {
    axios.get(baseUrl + props.userId + '/professional').then(response => {
      const professionalData = Object.assign({}, response.data.professional);
      delete professionalData['id'];
      delete professionalData['Users_id'];
      professionalData['endpoint'] = '/professional';

      const dates = ['start_date', 'finish_date', 'start_date_internship', 'finish_date_internship', 'start_date_social', 'finish_date_social', 'exam_date', 'professional_id_date']
      dates.forEach(date => {
        professionalData[date] = professionalData[date].slice(0, 10);
      });

      setInputs(professionalData);
    });
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
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Licenciatura
        </Typography>
        <form className={classes.form} noValidate onChange={handleChange}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={inputs.school}
                name="school"
                variant="outlined"
                required
                fullWidth
                id="school"
                label="Escuela o Facultad donde estudió la licenciatura"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={inputs.start_date}
                variant="outlined"
                required
                fullWidth
                name="start_date"
                label="Fecha de Inicio"
                type="date"
                id="start_date"
                InputLabelProps={{shrink: true}}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={inputs.finish_date}
                variant="outlined"
                required
                fullWidth
                name="finish_date"
                label="Fecha de Terminación"
                type="date"
                id="finish_date"
                InputLabelProps={{shrink: true}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={inputs.intership}
                variant="outlined"
                required
                fullWidth
                id="intership"
                label="Sitio donde realizó el internado"
                name="intership"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={inputs.start_date_internship}
                variant="outlined"
                required
                fullWidth
                name="start_date_internship"
                label="Inicio de Internado"
                type="date"
                id="start_date_internship"
                InputLabelProps={{shrink: true}}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={inputs.finish_date_internship}
                variant="outlined"
                required
                fullWidth
                name="finish_date_internship"
                label="Fin de Internado"
                type="date"
                id="finish_date_internship"
                InputLabelProps={{shrink: true}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={inputs.social_service}
                variant="outlined"
                required
                fullWidth
                id="social_service"
                label="Lugar donde realizó el servicio social"
                name="social_service"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={inputs.start_date_social}
                variant="outlined"
                required
                fullWidth
                name="start_date_social"
                label="Inicio de Servicio Social"
                type="date"
                id="start_date_social"
                InputLabelProps={{shrink: true}}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                value={inputs.finish_date_social}
                variant="outlined"
                required
                fullWidth
                name="finish_date_social"
                label="Fin de Servicio Social"
                type="date"
                id="finish_date_social"
                InputLabelProps={{shrink: true}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={inputs.exam_date}
                variant="outlined"
                required
                fullWidth
                name="exam_date"
                label="Fecha de Examen Profesional"
                type="date"
                id="exam_date"
                InputLabelProps={{shrink: true}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={inputs.exam_type}
                variant="outlined"
                required
                fullWidth
                name="exam_type"
                label="Tipo de Examen (Oral y/o Escrito)"
                id="exam_type"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={inputs.tesis}
                variant="outlined"
                fullWidth
                name="tesis"
                label="Título de la Tesis Recepcional"
                id="tesis"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={inputs.professional_id}
                variant="outlined"
                required
                fullWidth
                name="professional_id"
                label="Número de Cédula Profesional"
                id="professional_id"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={inputs.professional_id_date}
                variant="outlined"
                required
                fullWidth
                name="professional_id_date"
                label="Fecha de Expedición de Cédula Profesional"
                type="date"
                id="professional_id_date"
                InputLabelProps={{shrink: true}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={inputs.book}
                variant="outlined"
                required
                fullWidth
                name="book"
                label="Libro, Fojas y Número"
                id="book"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={inputs.ssa}
                variant="outlined"
                required
                fullWidth
                name="ssa"
                label="Registro en la SSA"
                id="ssa"
              />
            </Grid>

          </Grid>
        </form>
      </div>
    </Container>
  );
}
