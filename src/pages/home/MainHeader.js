
import logo from './images/comgecey_legend-1r.png';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Stack }from '@mui/material';


export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">

          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2, margin: "auto 10px" }}
              
            >
              <img  position="contain" width="200px" src={logo} alt="comgecey-icon" margin="10px 10px" />
            </IconButton>

            <div>
              <Button color="inherit" href="/registro">Registro</Button>
              <Button color="inherit" href="https://app.comgecey.org/signin">Ingreso</Button>
            </div>  
          </Stack>
      </AppBar>
    </Box>
  );
}