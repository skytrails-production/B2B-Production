
import { Typography, Box, Button, Grid } from '@mui/material';
import React from 'react';
import Checkbox from "@mui/material/Checkbox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import Input from "@mui/material/Input";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import { Textarea } from '@chakra-ui/react';

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const AdminUserForm = () => {
    return (
        <div className='flightContainer'>
            <form action='/AdminUserForm'>
                <Box>
                    <Button type='submit' sx={{ backgroundColor: '#006FFF', borderRadius: '10px', background: 'white', boxShadow: '0 1px 8px gray', color: '#006FFF' }}>User Name Create</Button>
                </Box>
            </form>
            <div className="row">
                <div className="col-xs-12 col-md-3">
                    <div className="form_input">
                        <label className="form_lable">Username*</label>
                        <input
                            type="text"
                            name="username"
                        ></input>
                    </div>
                </div>
                <div className="col-xs-12 col-md-3">
                    <div className="form_input">
                        <label className="form_lable">Password*</label>
                        <input
                            type="password"
                            name="password"
                        ></input>
                    </div>
                </div>
                <div className="col-xs-12 col-md-3">
                    <div className="form_input">
                        <label className="form_lable">Confirm Password*</label>
                        <input
                            type="password"
                            name="confirm password"
                        ></input>
                    </div>
                </div>
            </div>
            <Box my={2}>
                <form action='/AdminUserForm'>
                    <Box>
                        <Button type='submit' sx={{ backgroundColor: '#006FFF', borderRadius: '10px', background: 'white', boxShadow: '0 1px 8px gray', color: '#006FFF' }}>User Group</Button>
                    </Box>
                </form>
            </Box>
            <Box>
                <Grid container>
                    <Grid item xs={4}>
                        <Box display="flex" alignItems="center">
                            <Checkbox
                                {...label}
                                icon={<RadioButtonUncheckedIcon />}
                                checkedIcon={<RadioButtonCheckedIcon style={{ color: '#FF8900' }} />}
                            />
                            <Box display="flex" justifyContent="space-between">
                                <Typography color="#4E4C4C" fontSize="12px" fontWeight="bold">
                                    Sales (Search, Hold Booking ,Send For Ticketing)
                                </Typography>
                            </Box>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Checkbox
                                {...label}
                                icon={<RadioButtonUncheckedIcon />}
                                checkedIcon={<RadioButtonCheckedIcon style={{ color: '#FF8900' }} />}
                            />
                            <Box display="flex" justifyContent="space-between">
                                <Typography color="#4E4C4C" fontSize="12px" fontWeight="bold">
                                    Agent IRCTC
                                </Typography>
                            </Box>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Checkbox
                                {...label}
                                icon={<RadioButtonUncheckedIcon />}
                                checkedIcon={<RadioButtonCheckedIcon style={{ color: '#FF8900' }} />}
                            />
                            <Box display="flex" justifyContent="space-between">
                                <Typography color="#4E4C4C" fontSize="12px" fontWeight="bold">
                                    SA_Hotel
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box display="flex" alignItems="center">
                            <Checkbox
                                {...label}
                                icon={<RadioButtonUncheckedIcon />}
                                checkedIcon={<RadioButtonCheckedIcon style={{ color: '#FF8900' }} />}
                            />
                            <Box display="flex" justifyContent="space-between">
                                <Typography color="#4E4C4C" fontSize="12px" fontWeight="bold">
                                    Ticketing (Search, Book & Ticket, View Accounts)
                                </Typography>
                            </Box>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Checkbox
                                {...label}
                                icon={<RadioButtonUncheckedIcon />}
                                checkedIcon={<RadioButtonCheckedIcon style={{ color: '#FF8900' }} />}
                            />
                            <Box display="flex" justifyContent="space-between">
                                <Typography color="#4E4C4C" fontSize="12px" fontWeight="bold">
                                    Mini Subagent A
                                </Typography>
                            </Box>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Checkbox
                                {...label}
                                icon={<RadioButtonUncheckedIcon />}
                                checkedIcon={<RadioButtonCheckedIcon style={{ color: '#FF8900' }} />}
                            />
                            <Box display="flex" justifyContent="space-between">
                                <Typography color="#4E4C4C" fontSize="12px" fontWeight="bold">
                                    SA_HTL_VCHR
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={4}>
                        <Box display="flex" alignItems="center">
                            <Checkbox
                                {...label}
                                icon={<RadioButtonUncheckedIcon />}
                                checkedIcon={<RadioButtonCheckedIcon style={{ color: '#FF8900' }} />}
                            />
                            <Box display="flex" justifyContent="space-between">
                                <Typography color="#4E4C4C" fontSize="12px" fontWeight="bold">
                                    Accounting (Make Payment, View Accounts)
                                </Typography>
                            </Box>
                        </Box>
                        <Box display="flex" alignItems="center">
                            <Checkbox
                                {...label}
                                icon={<RadioButtonUncheckedIcon />}
                                checkedIcon={<RadioButtonCheckedIcon style={{ color: '#FF8900' }} />}
                            />
                            <Box display="flex" justifyContent="space-between">
                                <Typography color="#4E4C4C" fontSize="12px" fontWeight="bold">
                                    Insurance
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Box my={2}>
                <form action='/AdminUserForm'>
                    <Box>
                        <Button type='submit' sx={{ backgroundColor: '#006FFF', borderRadius: '10px', background: 'white', boxShadow: '0 1px 8px gray', color: '#006FFF' }}>Personal Details</Button>
                    </Box>
                </form>
            </Box>
            <Box mt={2} display="flex">
                <Typography
                    sx={{
                        fontSize: "16px",
                        color: "#666666",
                        fontWeight: "bold",
                        textDecoration: "underline",
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
                        placeholder="First Name"
                        border="none"
                        name='traveller first name'
                    ></Input>
                </Box>
                <Box className="input_area" ml={1}>
                    <Input
                        type="text"
                        placeholder="Last Name"
                        border="none"
                        name='traveller last  name'
                    ></Input>
                </Box>
            </Box>
            <Box mt={2} display="flex">
                <Typography
                    sx={{
                        fontSize: "16px",
                        color: "#666666",
                        fontWeight: "bold",
                        textDecoration: "underline",
                        cursor: "pointer",
                    }}
                >
                   Address:-*
                </Typography>
                <Box className="input_area" ml={2}>
                <Input
                        type="text"
                        border="none"
                        name='address'
                    ></Input>
                </Box>
                <Typography
                    sx={{
                        fontSize: "16px",
                        color: "#666666",
                        fontWeight: "bold",
                        textDecoration: "underline",
                        cursor: "pointer",
                    }} mx={5}
                >
                   City:-*
                </Typography>
                <Box className="input_area" ml={1}>
                    <Input
                        type="text"
                        border="none"
                        name='city'
                    ></Input>
                </Box>
                <Typography
                    sx={{
                        fontSize: "16px",
                        color: "#666666",
                        fontWeight: "bold",
                        textDecoration: "underline",
                        cursor: "pointer",
                    }} mx={5}
                >
                   State:-*
                </Typography>
                <Box className="input_area" ml={1}>
                <FormControl>
                        <NativeSelect
                            defaultValue={0}
                            inputProps={{
                                name: "price",
                            }}
                        >
                            <option value={10}>Uttar Pradesh</option>
                            <option value={20}>Maharashtra</option>
                            <option value={30}>Delhi</option>
                        </NativeSelect>
                    </FormControl>
                </Box>
            </Box>
            <Box mt={2} display="flex">
                <Typography
                    sx={{
                        fontSize: "16px",
                        color: "#666666",
                        fontWeight: "bold",
                        textDecoration: "underline",
                        cursor: "pointer",
                    }}
                >
                  Country*
                </Typography>
                <Box className="input_area" ml={2}>
                <FormControl>
                        <NativeSelect
                            defaultValue={0}
                            inputProps={{
                                name: "price",
                            }}
                        >
                            <option value={10}>India</option>
                            <option value={20}>U S</option>
                        </NativeSelect>
                    </FormControl>
                </Box>
                <Typography
                    sx={{
                        fontSize: "16px",
                        color: "#666666",
                        fontWeight: "bold",
                        textDecoration: "underline",
                        cursor: "pointer",
                    }} mx={5}
                >
                   Email:-*
                </Typography>
                <Box className="input_area" ml={1}>
                    <Input
                        type="email"
                        border="none"
                        name='email'
                    ></Input>
                </Box>
                <Typography
                    sx={{
                        fontSize: "16px",
                        color: "#666666",
                        fontWeight: "bold",
                        textDecoration: "underline",
                        cursor: "pointer",
                    }} mx={5}
                >
                   Mobile No.:-*
                </Typography>
                <Box className="input_area" ml={1}>
                <Input
                        type="number"
                        border="none"
                        name='Mobile Number'
                    ></Input>
                </Box>
            </Box>
            <Box mt={2} display="flex" boxShadow='0px 3px 6px #00000029' borderRadius='5px'>
                <Textarea type='text' placeholder='Remarks' sx={{width:'100%', borderRadius:'5px', border:'1px solid #00000029'}}></Textarea>
            </Box>

            <Box textAlign='center' my={3}>
                <form action='/'>
                    <Button variant='container' type='submit' sx={{backgroundColor:'#006FFF',borderRadius:'10px',color:'white'}}>Save</Button>
                </form>
            </Box>
        </div>
    )
}

export default AdminUserForm
