import React from 'react';
import { Divider, Grid } from '@mui/material';
import MainHeader from './MainHeader';
import CallToAction from './CallToAction';
import HowTo from './HowTo';
import Footer from './Footer';


export default function Home() {

  return (
    <div>
      <Grid container spacing={0} justify="center">
        <Grid item xs={12}>
          <MainHeader />
        </Grid>
        <Grid item xs={12}>
          <CallToAction />
        </Grid>
        <Grid item xs={12}>
          <HowTo />
        </Grid>
      </Grid>
      <Footer />
    </div>
  );
}
