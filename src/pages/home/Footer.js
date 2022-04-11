import React from 'react';
import { Link, Typography, Container, Button } from '@mui/material';
import fb from './images/f_logo_RGB-Black_72.png';


function Copyright() {
  return (
    <Typography variant="body2" color="white">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Comgecey
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer() {
  // const classes = useStyles();

  return (
    <footer style={{backgroundColor:"#1c2a2b", color:"white"}}>
      <Container maxWidth="sm">
        <center>
          <Typography style={{display: 'inline-block', margin: '20px'}} variant="body1">contacto@comgecey.org</Typography>
          <Button href="https://www.facebook.com/Consejo-de-M%C3%A9dicos-Generales-Certificados-del-Estado-de-Yucat%C3%A1n-1124844300864834/"><img style={{display: 'inline-block', width: '50px', margin: '20px'}} src={fb} alt="facebook-icon" /></Button>
        </center>

        <center>
          <Copyright color="white" sx={{color:"white"}} />
        </center>
      </Container>
    </footer>
  );
}
