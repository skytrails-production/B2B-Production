import React from 'react'
import SightseeingConfirmationDetail from "./SightseeingConfirmationDetail";
import SightseeingStepper from '../../../Components/SightseeingStepper';
import { Button, Box, Grid, Typography,Link } from '@mui/material';

const SightseeingBookingConfirmation = () => {
  return (
    <div className='flightContainer'>
      <SightseeingStepper/>
      <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={9}>
                        <SightseeingConfirmationDetail/>
                    </Grid>
                    <Grid item xs={3}>
                        <Box className='Guest_head' p={2}>
                            <Typography sx={{fontSize:'14px',fontWeight:'bold',color:'#252525'}} textAlign='center'>Sale Summary</Typography>
                            <Typography sx={{fontSize:'10px',fontWeight:'bold',color:'#006FFF'}} mt={2}>Travel: Ashok Travels Mandsaur Group</Typography>
                            <Box display='flex' justifyContent='space-between' mt={1}>
                                <Typography sx={{fontSize:'10px',fontWeight:'bold',color:'#666666'}}>Published Price:</Typography>
                                <Typography sx={{fontSize:'10px',fontWeight:'bold',color:'#FF8900'}}>₹3534</Typography>
                            </Box>
                            <Box display='flex' justifyContent='space-between'>
                                <Typography sx={{fontSize:'10px',fontWeight:'bold',color:'#666666'}}>Offered Price:</Typography>
                                <Typography sx={{fontSize:'10px',fontWeight:'bold',color:'#FF8900'}}>₹2534</Typography>
                            </Box>
                            <Box display='flex' justifyContent='space-between'>
                                <Typography sx={{fontSize:'10px',fontWeight:'bold',color:'#666666'}}>Commission Earned:</Typography>
                                <Typography sx={{fontSize:'10px',fontWeight:'bold',color:'#FF8900'}}>₹1000</Typography>
                            </Box>
                            <Box display='flex' justifyContent='space-between'>
                                <Typography sx={{fontSize:'10px',fontWeight:'bold',color:'#FF8900'}}></Typography>
                                <Typography sx={{fontSize:'10px',fontWeight:'bold',color:'#FF8900'}}>₹100</Typography>
                            </Box>
                            <Box display='flex' justifyContent='space-between'>
                                <Typography sx={{fontSize:'12px',fontWeight:'bold',color:'#666666'}}>Grand Total</Typography>
                                <Typography sx={{fontSize:'10px',fontWeight:'bold',color:'#FF8900'}} >₹2634</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
    </div>
  )
}

export default SightseeingBookingConfirmation
