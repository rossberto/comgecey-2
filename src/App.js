import React from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/home/Home';
import Apply from './apps/register/Apply';
import InscriptionForm from './apps/register/InscriptionForm';
import history from './history';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#1c2a2b',
    },
    secondary: {
      main: '#f50057',
    },
  },
});


function App() {
  return (
    <BrowserRouter history={history}>
      <ThemeProvider theme={theme}>
       <Routes>
        <Route path='user'>
          <Route path=':userId' element={<InscriptionForm />} />
        </Route>
        <Route path="registro" element={<Apply />} /> 
        <Route path="/" element={<Home />} />
       </Routes>    
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

    // <ThemeProvider theme={theme}>
    //   {/* <Router history={history}> */}
    //    <Routes>
    //     <Route path='/user/:userId' component={InscriptionForm} />
    //     <Route path='/registro' element={<Apply />} /> 
    //     <Route path='/' element={<Home />} />
    //     {/* <Navigate to='/' /> */}
    //    </Routes>
    //  {/* </Router> */}
    // </ThemeProvider>