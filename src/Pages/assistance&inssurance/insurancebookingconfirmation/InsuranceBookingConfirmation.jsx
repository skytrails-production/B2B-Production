import React from 'react'
import { Button, Box, Grid, Typography, Link } from "@mui/material";
import InssuranceStepper from '../../../Components/InssuranceStepper'
import BookingConfirmationDetails from './BookingConfirmationDetails';
import GuestPriceDetails from '../insuranceguestdetails/GuestPriceDetails';

const InsuranceBookingConfirmation = () => {
  return (
    <div className="flightContainer">
    <InssuranceStepper />
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Box>
          <BookingConfirmationDetails/>
          </Box>
        </Grid>
        <Grid item xs={3}>
    <GuestPriceDetails/>
        </Grid>
      </Grid>
    </Box>
  </div>
  )
}

export default InsuranceBookingConfirmation
