import React from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Fairrule from './Fairrule';
import Nonrefundable from './Nonrefundable';
import LuggageIcon from '@mui/icons-material/Luggage';

const FlightMutistopage = () => {

    const navigate = useNavigate();
    const OpenNewpage = () => {
        navigate('passengerdetail')
    }

    return (
        <div>
            <Box p={2} backgroundColor='#F5F5F5' boxShadow='1px 1px 8px gray' borderRadius='10px'>

                <Box display='flex'>
                    <Grid container>
                        <Grid md={2} sm={2} py={3}>
                            <Box display='flex' justifyContent='center'>
                                <Box sx={{ width: '34px', height: '34px', border: '2px solid gray', backgroundColor: 'white' }}></Box>
                                <Box px={1}>
                                    <Typography className='flight_name'>IndiGO</Typography>
                                    <Typography className='flight_class'>6E 2431, 6E 909</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid md={1} sm={1} py={3} display='flex' justifyContent='center'>
                            <Box px={1}>
                                <Typography className='flight_name'>04:55</Typography>
                                <Typography className='flight_class'>New Delhi</Typography>
                            </Box>
                        </Grid>
                        <Grid md={2} sm={2} py={4} >
                            <Box display='flex' justifyContent='center' >
                                <Box >
                                    <Box px={1} textAlign='center'>
                                        <Typography className='flight_class'>09h 15m</Typography>
                                    </Box>
                                    <Box px={1} textAlign='center'>
                                        <Typography className='flight_class'>3 Stop via Jaipur</Typography>
                                    </Box>
                                </Box>
                            </Box>

                        </Grid>
                        <Grid md={1} sm={1} py={3} display='flex' justifyContent='center'>
                            <Box px={1}>
                                <Typography className='flight_name'>04:55</Typography>
                                <Typography className='flight_class'>New Delhi</Typography>
                            </Box>
                        </Grid>
                        <Grid md={2} sm={2} py={3} display='flex' justifyContent='center' alignItems='center'>
                            <Box px={1}>
                                <Typography className='flight_price'>₹3423</Typography>
                            </Box>
                        </Grid>
                        <Grid md={2} sm={2} py={3} display='flex' justifyContent='center' alignItems='center'>
                            <Box px={1}>
                                <Typography className='flight_price'>₹3423</Typography>
                            </Box>
                        </Grid>
                        <Grid md={2} sm={2} py={3} display='flex' justifyContent='center' alignItems='center'>
                            <Button className='btn_booknow' onClick={OpenNewpage}>
                                <Typography color='white' fontSize='10px' display='flex' justifyContent='center' alignItems='center'>
                                    Book Now
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </Box>


                
                <Box display='flex'>
                    <Grid container>
                        <Grid md={2} sm={2}>
                            <Box display='flex' justifyContent='center'>
                                <Box px={1}>
                                    <Typography className='flight_name'>IndiGO</Typography>
                                    <Typography className='flight_class'>6E 2431, 6E 909</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid md={1} sm={1} display='flex' justifyContent='center'>
                            <Box px={1}>
                                <Typography className='flight_name'>04:55</Typography>
                                <Typography className='flight_class'>New Delhi</Typography>
                            </Box>
                        </Grid>
                        <Grid md={2} sm={2}>
                            <Box display='flex' justifyContent='center' >
                                <Box >
                                    <Box px={1} textAlign='center'>
                                        <Typography className='flight_class'>09h 15m</Typography>
                                    </Box>
                                    <Box px={1} textAlign='center'>
                                        <Typography className='flight_class'>3 Stop via Jaipur</Typography>
                                    </Box>
                                </Box>
                            </Box>

                        </Grid>
                        <Grid md={1} sm={1} display='flex' justifyContent='center'>
                            <Box px={1}>
                                <Typography className='flight_name'>04:55</Typography>
                                <Typography className='flight_class'>New Delhi</Typography>
                            </Box>
                        </Grid>
                        <Grid md={2} sm={2} display='flex' justifyContent='center' alignItems='center'>
                           
                        </Grid>
                        <Grid md={2} sm={2} display='flex' justifyContent='center' alignItems='center'>
                           
                        </Grid>
                        <Grid md={2} sm={2} display='flex' justifyContent='center' alignItems='center'>
                           
                        </Grid>
                    </Grid>
                </Box>
                <Box display='flex' mt={3}>
                    <Grid container>
                        <Grid md={2} sm={2}>
                            <Box display='flex' justifyContent='center'>
                                <Box px={1}>
                                    <Typography className='flight_name'>IndiGO</Typography>
                                    <Typography className='flight_class'>6E 2431, 6E 909</Typography>
                                </Box>
                            </Box>
                        </Grid>
                        <Grid md={1} sm={1} display='flex' justifyContent='center'>
                            <Box px={1}>
                                <Typography className='flight_name'>04:55</Typography>
                                <Typography className='flight_class'>New Delhi</Typography>
                            </Box>
                        </Grid>
                        <Grid md={2} sm={2}>
                            <Box display='flex' justifyContent='center' >
                                <Box >
                                    <Box px={1} textAlign='center'>
                                        <Typography className='flight_class'>09h 15m</Typography>
                                    </Box>
                                    <Box px={1} textAlign='center'>
                                        <Typography className='flight_class'>3 Stop via Jaipur</Typography>
                                    </Box>
                                </Box>
                            </Box>

                        </Grid>
                        <Grid md={1} sm={1} display='flex' justifyContent='center'>
                            <Box px={1}>
                                <Typography className='flight_name'>04:55</Typography>
                                <Typography className='flight_class'>New Delhi</Typography>
                            </Box>
                        </Grid>
                        <Grid md={2} sm={2} display='flex' justifyContent='center' alignItems='center'>
                           
                        </Grid>
                        <Grid md={2} sm={2} display='flex' justifyContent='center' alignItems='center'>
                           
                        </Grid>
                        <Grid md={2} sm={2} display='flex' justifyContent='center' alignItems='center'>
                           
                        </Grid>
                    </Grid>
                </Box>
                <Box display='flex' justifyContent='space-between'>
                    <Typography className='seat_left' display='flex' alignItems='center'>56 Seats Left</Typography>
                    <Box display='flex' >
                        <LuggageIcon style={{ color: 'gray' }} />
                        <Fairrule />
                        <Nonrefundable />
                    </Box>

                </Box>

            </Box>
        </div>
    )
}

export default FlightMutistopage
