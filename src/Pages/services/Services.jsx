import React from 'react'
import { Button, Box, Grid, Typography, Link } from "@mui/material";
import ServicesFilter from './servicefilter/ServicesFilter';
import ServicesTotalData from './servicefilter/ServicesTotalData';


const Services = () => {
  return (
    <div className="container-fluid margin-pecentage" >
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <ServicesFilter />
          </Grid>
          <Grid item xs={7}>
            <ServicesTotalData />
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default Services
