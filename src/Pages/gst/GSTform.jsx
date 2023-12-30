import { Typography, Box, Paper, Grid, styled, Input, Button, Stack } from '@mui/material';
import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { background } from '@chakra-ui/react';
import "./gstform.css"
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';


import color from "../../color/color"
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const initialData = [
    { label: 'Taxable Value:', inputName: 'taxableValue' },
    { label: 'CCST Rate: %) CGST Amount:', inputName: 'cgstAmount' },
    { label: '(SGST/UTGST Rate: %) SGST/UTGST Amount:', inputName: 'sgstAmount' },
    // ... Add more items as needed
];
const GSTform = () => {

    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
        setAge(event.target.value);
    };



    const [formData, setFormData] = useState({
        taxableValue: '',
        cgstAmount: '',
        sgstAmount: '',
        // ... Initialize other form fields
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    return (
        <div className='container-fluid margin-pecentage'>
            <Typography sx={{ fontSize: '20px', fontWeight: 'bold', color: '#252525' }} textAlign='center'>Submit GST Input Invoice</Typography>
            <Typography sx={{ fontSize: '22px', fontWeight: 'bold', color: color.bluedark }} textAlign='left' my={2}>Details of Receiver (Billed To):</Typography>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} columns={16}>
                    <Grid item xs={6} >
                        <Box display='flex' alignItems='center' justifyContent='space-between' my={2}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#666666' }} textAlign='Left'>Company Name:</Typography>
                            <Box sx={{ width: '50%', boxShadow: '0px 3px 6px #00000029', borderRadius: '10px', height: 'auto' }}>
                                <input type='text' className='gst_input' placeholder='skyTrails (Skd Tour & Travel)'></input>
                            </Box>
                        </Box>
                        <Box display='flex' alignItems='center' justifyContent='space-between' my={2}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#666666' }} textAlign='Left'>Company State:</Typography>
                            <Box sx={{ width: '50%', boxShadow: '0px 3px 6px #00000029', borderRadius: '10px', height: 'auto' }}>
                                <select name="company state" className='gst_input' style={{ border: 'none', textDecoration: 'none', width: '100%', borderRadius: '10px', paddingY: '10px' }}>
                                    <option>Select</option>
                                    <option>Select</option>
                                    <option>Select</option>
                                </select>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={5}>
                        <Box display='flex' alignItems='center' justifyContent='space-between' my={2}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#666666' }} textAlign='Left'>Company Premises Code:</Typography>
                            <Box sx={{ width: '50%', boxShadow: '0px 3px 6px #00000029', borderRadius: '10px', height: 'auto' }}>
                                <input type='text' className='gst_input' ></input>
                            </Box>
                        </Box>
                        <Box display='flex' alignItems='center' justifyContent='space-between' my={2}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#666666' }} textAlign='Left'>State Code:</Typography>
                            <Box sx={{ width: '50%', boxShadow: '0px 3px 6px #00000029', borderRadius: '10px', height: 'auto' }}>
                                <input type='text' className='gst_input' ></input>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={5}>
                        <Box display='flex' alignItems='center' justifyContent='space-between' my={2}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#666666' }} textAlign='Left'>Company GSTIN:</Typography>
                            <Box sx={{ width: '50%', boxShadow: '0px 3px 6px #00000029', borderRadius: '10px', height: 'auto' }}>
                                <input type='text' name='company gstin' className='gst_input' ></input>
                            </Box>
                        </Box>
                        <Box display='flex' alignItems='center' justifyContent='space-between' my={2}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#666666' }} textAlign='Left'>Company Address:</Typography>
                            <Box sx={{ width: '50%', boxShadow: '0px 3px 6px #00000029', borderRadius: '10px', height: 'auto' }}>
                                <input type='text' name='company address' className='gst_input' ></input>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Typography sx={{ fontSize: '22px', fontWeight: 'bold', color: color.bluedark }} textAlign='left' my={2}>Details of Source (Billed From):</Typography>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} columns={16}>
                    <Grid item xs={6}>
                        <Box display='flex' alignItems='center' justifyContent='space-between' my={2}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#666666' }} textAlign='Left'>Company State:</Typography>
                            <Box sx={{ width: '50%', boxShadow: '0px 3px 6px #00000029', borderRadius: '10px', height: 'auto' }}>
                                <select className='gst_input' name="company state" style={{ border: 'none', textDecoration: 'none', width: '100%', borderRadius: '10px', paddingY: '10px' }}>
                                    <option>Supplier Invoice</option>
                                    <option>Select</option>
                                    <option>Select</option>
                                </select>
                            </Box>
                        </Box>
                        <Box display='flex' alignItems='center' justifyContent='space-between' my={2}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#666666' }} textAlign='Left'></Typography>
                            <Box sx={{ width: '50%', boxShadow: '0px 3px 6px #00000029', borderRadius: '10px', height: 'auto' }}>
                                <select className='gst_input' name="company state" style={{ border: 'none', textDecoration: 'none', width: '100%', borderRadius: '10px', paddingY: '10px' }}>
                                    <option>Invoice for GST Rembursm..</option>
                                    <option>Select</option>
                                    <option>Select</option>
                                </select>
                            </Box>
                        </Box>

                    </Grid>
                    <Grid item xs={5}>
                        <Box display='flex' alignItems='center' justifyContent='space-between' my={2}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#666666' }} textAlign='Left'>Select Source:</Typography>
                            <Box sx={{ width: '50%', boxShadow: '0px 3px 6px #00000029', borderRadius: '10px', height: 'auto' }}>
                                <select className='gst_input' name="company state" style={{ border: 'none', textDecoration: 'none', width: '100%', borderRadius: '10px', paddingY: '10px' }}>
                                    <option>Agency</option>
                                    <option>Select</option>
                                    <option>Select</option>
                                </select>
                            </Box>

                        </Box>
                        <Box display='flex' alignItems='center' justifyContent='space-between' my={2}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#666666' }} textAlign='Left'>Select Source:</Typography>
                            <Box sx={{ width: '50%', boxShadow: '0px 3px 6px #00000029', borderRadius: '10px', height: 'auto' }}>
                                <select className='gst_input' name="company state" style={{ border: 'none', textDecoration: 'none', width: '100%', borderRadius: '10px', paddingY: '10px' }}>
                                    <option>Agency</option>
                                    <option>Select</option>
                                    <option>Select</option>
                                </select>
                            </Box>

                        </Box>
                    </Grid>
                    <Grid item xs={5}>
                        <Box display='flex' alignItems='center' justifyContent='space-between' my={2}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#666666' }} textAlign='Left'>Select Agency</Typography>
                            <Box sx={{ width: '50%', boxShadow: '0px 3px 6px #00000029', borderRadius: '10px', height: 'auto' }}>
                                <select className='gst_input' name="select agency" style={{ border: 'none', textDecoration: 'none', width: '100%', borderRadius: '10px', paddingY: '10px' }}>
                                    <option>Select</option>
                                    <option>Select</option>
                                    <option>Select</option>
                                </select>
                            </Box>

                        </Box>

                        <Box display='flex' alignItems='center' justifyContent='space-between' my={2}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#666666' }} textAlign='Left'></Typography>
                            <Box sx={{ width: '50%', boxShadow: '0px 3px 6px #00000029', borderRadius: '10px', height: 'auto' }}>
                                <select className='gst_input' name="cash a/c" style={{ border: 'none', textDecoration: 'none', width: '100%', borderRadius: '10px', paddingY: '10px' }}>
                                    <option>Cash A/C</option>
                                    <option>Select</option>
                                    <option>Select</option>
                                </select>
                            </Box>
                        </Box>

                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} columns={16}>
                    <Grid item xs={6}>
                        <Box display='flex' alignItems='center' justifyContent='space-between' my={2}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#666666' }} textAlign='Left'>GST Flag:</Typography>
                            <Box sx={{ width: '50%', boxShadow: '0px 3px 6px #00000029', borderRadius: '10px', height: 'auto' }}>
                                <select name="gst flag" className='gst_input' style={{ border: 'none', textDecoration: 'none', width: '100%', borderRadius: '10px', paddingY: '10px' }}>
                                    <option>GST Paid</option>
                                    <option>Select</option>
                                    <option>Select</option>
                                </select>
                            </Box>
                        </Box>
                        <Box display='flex' alignItems='center' justifyContent='space-between' my={2}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#666666' }} textAlign='Left'>State Name:</Typography>
                            <Box sx={{ width: '50%', boxShadow: '0px 3px 6px #00000029', borderRadius: '10px', height: 'auto' }}>
                                <select name="state name" className='gst_input' style={{ border: 'none', textDecoration: 'none', width: '100%', borderRadius: '10px', paddingY: '10px' }}>
                                    <option>State Name</option>
                                    <option>Select</option>
                                    <option>Select</option>
                                </select>
                            </Box>
                        </Box>

                    </Grid>
                    <Grid item xs={5}>
                        <Box display='flex' alignItems='center' justifyContent='space-between' my={2}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#666666' }} textAlign='Left'>State Code:</Typography>
                            <Box sx={{ width: '50%', boxShadow: '0px 3px 6px #00000029', borderRadius: '10px', height: 'auto' }}>
                                <select className='gst_input' name="state code" style={{ border: 'none', textDecoration: 'none', width: '100%', borderRadius: '10px', paddingY: '10px' }}>
                                    <option>State Code</option>
                                    <option>Select</option>
                                    <option>Select</option>
                                </select>
                            </Box>
                        </Box>
                        <Box display='flex' alignItems='center' justifyContent='space-between' my={2}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#666666' }} textAlign='Left'>GSTIN:</Typography>
                            <Box sx={{ width: '50%', boxShadow: '0px 3px 6px #00000029', borderRadius: '10px', height: 'auto' }}>
                                <input type='text' name='gstin' className='gst_input' ></input>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={5}>
                        <Box display='flex' alignItems='center' justifyContent='space-between' my={2}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#666666' }} textAlign='Left'>Invoice Date:</Typography>
                            <Box sx={{ width: '50%', boxShadow: '0px 3px 6px #00000029', borderRadius: '10px', height: 'auto' }}>
                                <input type='date' name='invoice date' className='gst_input' ></input>
                            </Box>
                        </Box>
                        <Box display='flex' alignItems='center' justifyContent='space-between' my={2}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#666666' }} textAlign='Left'>Submitted On:</Typography>
                            <Box sx={{ width: '50%', boxShadow: '0px 3px 6px #00000029', borderRadius: '10px', height: 'auto' }}>
                                <input type='text' name='submission on' className='gst_input' ></input>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
            <Typography sx={{ fontSize: '18px', fontWeight: 'bold', color: color.bluedark }} textAlign='left' my={2}>Details of Goods/Service:</Typography>





            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>

                    <Box my={2}>
                        <Typography sx={{ fontSize: '18px', fontWeight: 'bold', color: '#252525' }} textAlign='left' my={2}>Remarks:</Typography>
                        <Box sx={{ width: '50%', borderRadius: '10px', height: 'auto' }}>
                            <textarea type='text' name='state name' className='gst_input' />
                        </Box>
                    </Box>
                    <Box my={2}>
                        <input type='file' name='state name' />
                    </Box>
                    <Typography sx={{ fontSize: '13px', fontWeight: 'bold', color: '#252525' }}>Upload Supporting Docs(.pdf,.png,.jpg,.jpeg,.bmp)</Typography>

                </Grid>
                <Grid item xs={6} >

                    <Grid container>
                        {initialData.map((item, index) => (
                            <Box
                                key={index}
                                display='flex'
                                justifyContent='space-between'
                                alignItems='center'
                                my={2}
                                p={2}
                                borderRadius={10}

                            >

                                <Typography variant='body1' style={{ width: "200px" }}>{item.label}</Typography>
                                <Input
                                    type='text'
                                    name={item.inputName}
                                    className='gst_input'
                                    value={formData[item.inputName]}
                                    onChange={handleInputChange}
                                    style={{ width: '150px' }}
                                />
                            </Box>
                        ))}

                    </Grid>



                </Grid>
            </Grid>
            <Box display='flex' alignItems='center'>
                <FormControlLabel control={<Checkbox defaultChecked />} />
                <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#252525' }}>I hereby declare that the above written particulars are true and correct to the best of my knowledge and belief.</Typography>
            </Box>
            <Box textAlign='center' display='flex' justifyContent='center' my={3}>
                <Stack spacing={2} direction="row" textAlign='center'>
                    <Button variant='contained' type='submit' style={{ backgroundColor: color.bluedark }}>Reset</Button>
                    <Button variant='contained' type='submit' style={{ backgroundColor: color.bluedark }}>Submit</Button>
                </Stack>
            </Box>
        </div>
    )
}

export default GSTform;
