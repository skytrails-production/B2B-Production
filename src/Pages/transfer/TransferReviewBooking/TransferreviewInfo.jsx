import React from 'react'
import { Box, Typography, Grid,Button,Link } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Input from "@mui/material/Input";
import ControlCameraIcon from '@mui/icons-material/ControlCamera';

const TransferreviewInfo = () => {
  return (
    <div>
            <Box className='dtail_guest'>
                <Box sx={{ boxShadow: '0px 3px 6px #00000029', width: '100%', borderRadius: '20px', margin: '0px' }}>
                    <Typography className='car_txt' p={1}>Private Standard Car</Typography>
                </Box>
                <Box>
                    <Grid container spacing={3} p={3}>
                        <Grid item lg={2}>
                            <Box>
                                <Typography className='car_txt'>Transfer Details:</Typography>
                                <Typography className='car_txt'>Transfer Time:</Typography>
                                <Typography className='car_txt'>Language:</Typography>
                            </Box>
                        </Grid>
                        <Grid item lg={3}>
                            <Box>
                                <Typography className='car_txt'>10 Jan, 2023</Typography>
                                <Typography className='link_text'>1 Hour</Typography>
                                <Typography className='link_text'>Amsterdam</Typography>
                            </Box>
                        </Grid>
                        <Grid item lg={2}>
                            <Box>
                                <Typography className='car_txt'>Pick Up:</Typography>
                                <Typography className='car_txt'>Drop Off:</Typography>
                                <Typography className='car_txt'>No of PAX:</Typography>
                            </Box>
                        </Grid>
                        <Grid item lg={2}>
                            <Box>
                                <Typography className='link_text'>Airport</Typography>
                                <Typography className='link_text'>Port</Typography>
                                <Typography className='link_text'>1 Adult</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box className='dtail_guest' my={2} p={2}>
                <Typography className='car_txt'>Enter Passenger Details</Typography>
                <Box display='flex' py={2}>
                    <ControlCameraIcon />
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: '#FF8900' }}>Corporate Booking</Typography>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: '#666666' }}>(In case of corporate booking. Please enter the pan no. of corporate)</Typography>
                </Box>
                <Box display='flex' pb={2}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: '#252525' }}>Passenger 1 - Adult(6-99)</Typography>
                </Box>

                <Box mt={2}>
                    <Box>
                        <Box mt={2} display="flex" textAlign='center' alignItems='center'>
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    color: "#666666",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }}
                            >
                                Name:-*
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    color: "#666666",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }} ml={5}
                            >
                               Mr Dheeraj Vishwakarma
                            </Typography>

                           
                            
                        </Box>
                        <Box mt={2} display="flex" textAlign='center' alignItems='center'>

                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    color: "#666666",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }}
                            >
                                Mobile No.*
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    color: "#666666",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }} ml={2}
                            >
                                +91 98896 68444
                            </Typography>
                           
                        </Box>
                        <Box mt={2} display="flex" textAlign='center' alignItems='center'>

                           
                           
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    color: "#666666",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }}
                            >
                                Pan.*
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    color: "#666666",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }} ml={7}
                            >
                               GBDH234F
                            </Typography>
                           
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className='dtail_guest' my={2} p={2}>

                <Box display='flex' pb={2}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: '#252525' }}>Pick Up Details</Typography>
                </Box>

                <Box mt={2}>
                    <Box>
                        <Box mt={2} display="flex" textAlign='center' alignItems='center'>
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    color: "#666666",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }}
                            >
                                Airport Name*
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    color: "#666666",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }} ml={5}
                            >
                                Delhi Airport
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    color: "#666666",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }} ml={15}
                            >
                               Airport Name*
                            </Typography>
                            
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    color: "#666666",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }} ml={5}
                            >
                              FSG123
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    color: "#666666",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }} ml={5}
                            >
                              345345
                            </Typography>

                           
                            
                        </Box>
                        <Box mt={2} display="flex" textAlign='center' alignItems='center'>
                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    color: "#666666",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }}
                            >
                                Pick Up Date*
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    color: "#666666",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }} ml={5}
                            >
                                12 Jan, 2023
                            </Typography>
                            
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    color: "#666666",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }} ml={15}
                            >
                                Pick Up Time*
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    color: "#666666",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }} ml={5}
                            >
                              10:00 AM
                            </Typography>
                           


                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className='dtail_guest' my={2} p={2}>

                <Box display='flex' pb={2}>
                    <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: '#252525' }}>Drop Off Details</Typography>
                </Box>

                <Box mt={2}>
                    <Box>
                        <Box mt={2} display="flex" textAlign='center' alignItems='center'>
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    color: "#666666",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }}
                            >
                                Ship Name/Name*
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    color: "#666666",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }} ml={5}
                            >
                               Tom Curise
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    color: "#666666",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }} ml={15}
                            >
                                Shipping Company*
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    color: "#666666",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }} ml={5}
                            >
                               Jaadone
                            </Typography>
                           

                        </Box>
                        <Box mt={2} display="flex" textAlign='center' alignItems='center'>
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    color: "#666666",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }}
                            >
                                Shipping Destination*
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    color: "#666666",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }}
                            >
                               Japan
                            </Typography>
                            


                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    color: "#666666",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }} ml={20}
                            >
                                Pick Up Time*
                            </Typography>
                            <Typography
                                sx={{
                                    fontSize: "12px",
                                    color: "#666666",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }} ml={5}
                            >
                               14:30 PM
                            </Typography>
                            


                        </Box>
                    </Box>
                </Box>
            </Box>
            <Box className='dtail_guest' my={2} p={2}>
                <Typography sx={{ fontSize: '16px', color: '#252525', fontWeight: 'bold', }}>Cancellation & Charges:</Typography>
                <Grid container spacing={3} p={1}>
                    <Grid item xs={12} md={5}>
                        <Typography sx={{ fontSize: '13px', color: '#252525', fontWeight: 'bold', }}>Cancelled on or After</Typography>
                        <Typography sx={{ fontSize: '13px', color: '#006FFF', fontWeight: 'bold', }}>07 Jan, 2023</Typography>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography sx={{ fontSize: '13px', color: '#252525', fontWeight: 'bold', }}>Cancelled on or After</Typography>
                        <Typography sx={{ fontSize: '13px', color: '#006FFF', fontWeight: 'bold', }}>09 Jan, 2023</Typography>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <Typography sx={{ fontSize: '13px', color: '#252525', fontWeight: 'bold', textAlign: 'right' }}>Cancellation Charges</Typography>
                        <Typography sx={{ fontSize: '13px', color: '#FF8900', fontWeight: 'bold', textAlign: 'right' }}>100%</Typography>
                    </Grid>
                </Grid>

            </Box>
            <Box my={3}>
                <form action='/TransferConfirmation'>
                    <Box textAlign='center'>
                        <Button variant="contained" type='submit' style={{ backgroundColor: '#006FFF', borderRadius: '10px' }}>Generate Ticket</Button>
                    </Box>
                    
                </form>
            </Box>
        </div>
  )
}

export default TransferreviewInfo
