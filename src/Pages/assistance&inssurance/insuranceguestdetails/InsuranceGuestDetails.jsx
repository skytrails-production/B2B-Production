import React from "react";
import { Button, Box, Grid, Typography, Link } from "@mui/material";
import InssuranceStepper from "../../../Components/InssuranceStepper";
import GuestBookingDetails from "./GuestBookingDetails";
import GuestPriceDetails from "./GuestPriceDetails";

const InsuranceGuestDetails = () => {
  return (
    <div className="flightContainer">
      <InssuranceStepper />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Box>
              <GuestBookingDetails />
            </Box>
          </Grid>
          <Grid item xs={3}>
            <GuestPriceDetails/>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default InsuranceGuestDetails;
