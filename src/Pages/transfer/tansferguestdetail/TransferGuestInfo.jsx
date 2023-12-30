import React from 'react';
import "./transferguestdetail.css";
import { Box, Typography, Grid,Button,Link } from "@mui/material";
import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Input from "@mui/material/Input";

const TransferGuestInfo = () => {
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

                            <Box className="input_area" ml={2}>
                                <FormControl>
                                    <NativeSelect
                                        defaultValue={0}
                                        inputProps={{
                                            name: "price",
                                        }}
                                    >
                                        <option value={10}>Mr.</option>
                                        <option value={20}>Miss.</option>
                                        <option value={30}>Mrs.</option>
                                    </NativeSelect>
                                </FormControl>
                            </Box>
                            <Box className="input_area" ml={1}>
                                <Input
                                    type="text"
                                    placeholder="Traveller First Name"
                                    border="none"
                                    name='traveller first name'
                                ></Input>
                            </Box>
                            <Box className="input_area" ml={1}>
                                <Input
                                    type="text"
                                    placeholder="Traveller Last Name"
                                    border="none"
                                    name='traveller last  name'
                                ></Input>
                            </Box>
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
                            <Box className="input_area" mx={1}>
                                <Input
                                    type="number"
                                    placeholder=" 91+ 8724563587"
                                    border="none"
                                    name='number'
                                ></Input>
                            </Box>
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    color: "#666666",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }} ml={5}
                            >
                                Pan.*
                            </Typography>
                            <Box className="input_area" mx={1}>
                                <Input
                                    type="number"
                                    border="none"
                                    name='pan'
                                ></Input>
                            </Box>
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

                            <Box className="input_area" ml={2}>
                                <Input
                                    type="text"
                                    border="none"
                                    name='airport name'
                                ></Input>
                            </Box>
                            <Box className="input_area" ml={1}>
                                <Input
                                    type="text"
                                    placeholder="Airport code *"
                                    border="none"
                                    name='airport code'
                                ></Input>
                            </Box>
                            <Box className="input_area" ml={1}>
                                <Input
                                    type="Number"
                                    placeholder="Flight Number"
                                    border="none"
                                    name='flight number'
                                ></Input>
                            </Box>
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
                                Pick Up Date*
                            </Typography>
                            <Box className="input_area" ml={1}>
                                <Input
                                    type="date"
                                    border="none"
                                    name='pickup date'
                                ></Input>
                            </Box>
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    color: "#666666",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }} ml={5}
                            >
                                Pick Up Time*
                            </Typography>
                            <Box className="input_area" ml={1}>
                                <Input
                                    type="time"
                                    border="none"
                                    name='pickup Time'
                                ></Input>
                            </Box>


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

                            <Box className="input_area" ml={2}>
                                <Input
                                    type="text"
                                    border="none"
                                    name='airport name'
                                ></Input>
                            </Box>
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    color: "#666666",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }} ml={5}
                            >
                                Shipping Company*
                            </Typography>
                            <Box className="input_area" ml={1}>
                                <Input
                                    type="text"
                                    border="none"
                                    name='ship name'
                                ></Input>
                            </Box>

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
                            <Box className="input_area" ml={1}>
                                <Input
                                    type="Number"
                                    border="none"
                                    name='shipping destination'
                                ></Input>
                            </Box>


                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    color: "#666666",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }} ml={5}
                            >
                                Pick Up Time*
                            </Typography>
                            <Box className="input_area" ml={1}>
                                <Input
                                    type="time"
                                    border="none"
                                    name='pickup Time'
                                ></Input>
                            </Box>


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
                <form action='/TransferReviewBooking'>
                    <Box textAlign='center'>
                        <Button variant="contained" type='submit' style={{ backgroundColor: '#006FFF', borderRadius: '10px' }}></Button>
                    </Box>
                    <Box textAlign='center'>
                        <Link color='#FF8900' >Choose Another Transfer</Link>
                    </Box>
                </form>
            </Box>
        </div>
    )
}

export default TransferGuestInfo
