import { Typography, Box, Button,Grid,Link } from '@mui/material';
import React from 'react';
import './sighseeingreview.css';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Input from "@mui/material/Input";

const SightseeingGuestDetail = () => {
  return (
    <div>
      <Box className='Guest_head' my={2}>
        <Box display='flex' justifyContent='space-between' padding='10px' mx={2}>
          <Box>
            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#252525' }}>Vondelpark and Old West neighbourhood:</Typography>
            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#252525' }}> A Self-Guided Audio Tour</Typography>
          </Box>
          <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#FF8900', textDecoration: 'underline', cursor: 'pointer' }}>Choose Another Sightseeing</Typography>
        </Box>
      </Box>
      <Box className='Guest_head' my={2}>
        <Box display='flex' justifyContent='space-between' >
          <Box sx={{ boxShadow: '2px 2px 8px gray', width: '100%', padding: '10px', borderRadius: '20px' }}>
            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#252525' }} mx={2}>Sightseeing Details</Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent='space-around'>
          <Box p={3}>
            <Box display="flex">
              <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#252525' }}>Tour Date:</Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#006FFF' }} ml={2}>10 Jan, 2023</Typography>
            </Box>
            <Box display="flex">
              <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#252525' }}>Duration:</Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#006FFF' }} ml={2}>1 Hour</Typography>
            </Box>
            <Box display="flex">
              <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#252525' }}>City:</Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#006FFF' }} ml={2}>Amsterdam</Typography>
            </Box>
          </Box>
          <Box p={3}>
            <Box display="flex">
              <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#252525' }}>NO. of Adult (Age: 6-99):</Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#006FFF' }} ml={2}>NO. of Adult (Age: 6-99):</Typography>
            </Box>
            <Box display="flex">
              <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#252525' }}>Country:</Typography>
              <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#006FFF' }} ml={2}>Neatherland</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box  className='Bus_box' >
      
            <Box >
            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: '#252525' }}> Passenger Details</Typography>
            </Box>
            
            <Box >
            <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: '#252525' }}>Passenger 1 - Adult(6-99)</Typography>
            </Box>
            <Box display='flex' justifyContent='space-between'>
            <Box  mt={2}>
                <Box display='flex' mt={1} textAlign='left' alignItems='left'>
                <Typography ml={2} sx={{ fontSize: '14px', fontWeight: 'bold', color: 'black' }} >PAN *</Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#FF8900' }} ml={3}>VSS345GF</Typography>
                </Box>
                <Box display='flex' mt={1} textAlign='center' alignItems='center'>
                <Typography ml={2} sx={{ fontSize: '14px', fontWeight: 'bold', color: 'black' }} >Name: *</Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#006FFF' }} ml={3}>Aashi Caj</Typography>
                </Box>
                <Box display='flex' mt={1} textAlign='center' alignItems='center'>
                <Typography ml={2} sx={{ fontSize: '14px', fontWeight: 'bold', color: 'black' }} >Date of Birth:</Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#006FFF' }} ml={3}>12 Dec, 1982</Typography>
                </Box>
                <Box display='flex' mt={1} textAlign='center' alignItems='center'>
                <Typography ml={2} sx={{ fontSize: '14px', fontWeight: 'bold', color: 'black' }} >Nationality:</Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#006FFF' }} ml={3}>Indian</Typography>
                </Box>
        </Box>
            <Box  mt={2}>
                <Box display='flex' mt={1} textAlign='right' alignItems='center'>
                <Typography ml={2} sx={{ fontSize: '14px', fontWeight: 'bold', color: 'black' }} >Passport No.:</Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#FF8900' }} ml={3}>57654654</Typography>
                </Box>
                <Box display='flex' mt={1} textAlign='center' alignItems='center'>
                <Typography ml={2} sx={{ fontSize: '14px', fontWeight: 'bold', color: 'black' }} >Mobile No.:</Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#006FFF' }} ml={3}>91+ 8795462587</Typography>
                </Box>
                <Box display='flex' mt={1} textAlign='center' alignItems='center'>
                <Typography ml={2} sx={{ fontSize: '14px', fontWeight: 'bold', color: 'black' }} >Gender:</Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#006FFF' }} ml={3}>Male</Typography>
                </Box>
                <Box display='flex' mt={1} textAlign='center' alignItems='center'>
                <Typography ml={2} sx={{ fontSize: '14px', fontWeight: 'bold', color: 'black' }} >Nationality:</Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#006FFF' }} ml={3}>Indian</Typography>
                </Box>
        </Box>
            </Box>
        
      </Box>
      <Box sx={{ padding: '15px', borderRadius: '10px', boxShadow: '0px 3px 6px #00000029', marginTop: '15px' }}>
                    <Typography sx={{ fontSize: '16px', color: '#252525', fontWeight: 'bold', }}>Cancellation & Charges:</Typography>
                    <Typography sx={{ fontSize: '13px', color: '#252525', fontWeight: 'bold', }}>Room 1: Standard Room</Typography>
                    <Grid container spacing={3} p={1}>
                        <Grid item xs={12} md={5}>
                            <Typography sx={{ fontSize: '13px', color: '#252525', fontWeight: 'bold', }}>Cancelled on or After</Typography>
                            <Typography sx={{ fontSize: '13px', color: '#006FFF', fontWeight: 'bold', }}>07 Jan, 2023</Typography>
                            <Typography sx={{ fontSize: '13px', color: '#006FFF', fontWeight: 'bold', }}>19 Jan, 2023</Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Typography sx={{ fontSize: '13px', color: '#252525', fontWeight: 'bold', }}>Cancelled on or After</Typography>
                            <Typography sx={{ fontSize: '13px', color: '#006FFF', fontWeight: 'bold', }}>09 Jan, 2023</Typography>
                            <Typography sx={{ fontSize: '13px', color: '#006FFF', fontWeight: 'bold', }}>23 Jan, 2023</Typography>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Typography sx={{ fontSize: '13px', color: '#252525', fontWeight: 'bold', textAlign: 'right' }}>Cancellation Charges</Typography>
                            <Typography sx={{ fontSize: '13px', color: '#FF8900', fontWeight: 'bold', textAlign: 'right' }}>100%</Typography>
                            <Typography sx={{ fontSize: '13px', color: '#FF8900', fontWeight: 'bold', textAlign: 'right' }}>100%</Typography>
                        </Grid>
                        <Typography sx={{ fontSize: '13px', color: '#FF8900', fontWeight: 'bold', marginTop: '13px' }} ml={2}>Note: Early check out will attract full cancellation charges unless otherwise specified.</Typography>
                    </Grid>

                </Box>

                <Box sx={{ padding: '15px', borderRadius: '10px', boxShadow: '0px 3px 6px #00000029', marginTop: '15px' }}>
                <Typography sx={{ fontSize: '16px', color: '#252525', fontWeight: 'bold', }} py={2}>Guidelines:</Typography>
                <Typography sx={{ fontSize: '13px', color: '#252525', fontWeight: 'bold', }}>Departure Point: Vondelpark 1, 1071 AA Amsterdam, Netherlands </Typography>
                <Typography sx={{ fontSize: '13px', color: '#252525', fontWeight: 'bold', }}>Departure Time: </Typography>
                <Typography sx={{ fontSize: '13px', color: '#252525', fontWeight: 'bold', }}>Confirm time with the local provider in advance of your experience.</Typography>
                <Typography sx={{ fontSize: '13px', color: '#252525', fontWeight: 'bold', }}>Vondelpark and Old West Neighbourhood; A Self-guided Audio Tour </Typography>
                <Typography sx={{ fontSize: '13px', color: '#252525', fontWeight: 'bold', }}>9/02/2019 - 01/10/2023 </Typography>
                <Typography sx={{ fontSize: '13px', color: '#252525', fontWeight: 'bold', }}>Monday - Sunday: 12:00 AM - 11:59 PM</Typography>
                <Typography sx={{ fontSize: '13px', color: '#252525', fontWeight: 'bold', }} my={2}>Duration: 1 Hour</Typography>
                </Box>


                <Box my={3}>
                <form action='/SightseeingBookingConfirmation'>
                  <Box textAlign='center'>
                    <Button variant="contained" type='submit' style={{ backgroundColor: '#006FFF', borderRadius: '10px' }}>Generate Ticket</Button>
                   
                  </Box>
                </form>
                </Box>
    </div>
  )
}

export default SightseeingGuestDetail
