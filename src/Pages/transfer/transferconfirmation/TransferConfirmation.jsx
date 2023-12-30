import React from 'react';
import TransferStepper from '../../../Components/TransferStepper';
import { Box, Typography, Link, Grid } from "@mui/material";
import TransferSaleSummary from "../tansferguestdetail/TransferSaleSummary";
import TransferConfirmDetail from './TransferConfirmDetail';

const TransferConfirmation = () => {
  return (
    <div className='flightContainer'>
            <TransferStepper />
            <Grid container spacing={3}>
                <Grid item lg={9}>
                    <Box className='transfer_guest'>
                        <Typography className='car_txt'>Private Standard Car</Typography>
                        <Link className='car_link_txt'>Choose Another Transfer</Link>
                    </Box>
                    <Box my={2}>
                        <TransferConfirmDetail/>
                    </Box>
                </Grid>
                <Grid item lg={3}>
                    <TransferSaleSummary />
                </Grid>
            </Grid>

        </div>
  )
}

export default TransferConfirmation
