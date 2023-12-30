import React from 'react';
import { Button, Box, Grid, Typography, Link } from '@mui/material';
import "./transferresult.css";


const TrasferDetail = () => {
    return (
        <div>
            <Box className="transfer_top_detail">
                <Grid container spacing={3}>
                    <Grid item lg={2}>
                        <Box>
                            <Typography className='info_txt'>Private Standard Car </Typography>
                            <Link className='link_txt'>More Info</Link>
                        </Box>
                    </Grid>
                    <Grid item lg={2}>
                        <Box>
                            <Typography className='info_txt'>0 Hr 30 Min</Typography>
                        </Box>
                    </Grid>
                    <Grid item lg={2}>
                        <Box>
                            <Typography className='info_txt' textAlign='center'>Private Standard Car</Typography>
                        </Box>
                    </Grid>
                    <Grid item lg={2}>
                        <Box>
                            <Typography className='info_txt'>3</Typography>
                        </Box>
                    </Grid>
                    <Grid item lg={1}>
                        <Box>
                            <Typography className='info_txt'>3</Typography>
                        </Box>
                    </Grid>
                    <Grid item lg={3} display='flex' justifyContent='space-between'>
                        <Box>
                            <Typography sx={{color:'#FF8900', fontSize:'14px',fontWeight:'bold'}}>Rs 1040</Typography>
                        </Box>
                        <form action='TansferGuestDetail'>
                        <Box>
                           <Button variant='contained' type='submit' sx={{backgroundColor:'#006FFF',borderRadius:'10px'}}>Book</Button>
                        </Box>
                        </form>
                    </Grid>
                </Grid>
            </Box>
            <Box className="transfer_top_detail" my={2}>
                <Grid container spacing={3}>
                    <Grid item lg={2}>
                        <Box>
                            <Typography className='info_txt'>Private Standard Car </Typography>
                            <Link className='link_txt'>More Info</Link>
                        </Box>
                    </Grid>
                    <Grid item lg={2}>
                        <Box>
                            <Typography className='info_txt'>N/A</Typography>
                        </Box>
                    </Grid>
                    <Grid item lg={2}>
                        <Box>
                            <Typography className='info_txt' textAlign='center'> Car</Typography>
                        </Box>
                    </Grid>
                    <Grid item lg={2}>
                        <Box>
                            <Typography className='info_txt'>2</Typography>
                        </Box>
                    </Grid>
                    <Grid item lg={1}>
                        <Box>
                            <Typography className='info_txt'>2</Typography>
                        </Box>
                    </Grid>
                    <Grid item lg={3} display='flex' justifyContent='space-between'>
                        <Box>
                            <Typography sx={{color:'#FF8900', fontSize:'14px',fontWeight:'bold'}}>Rs 640</Typography>
                        </Box>
                        <form action='TansferGuestDetail'>
                        <Box>
                           <Button variant='contained' type='submit' sx={{backgroundColor:'#006FFF',borderRadius:'10px'}}>Book</Button>
                        </Box>
                        </form>
                    </Grid>
                </Grid>
            </Box>
            <Box className="transfer_top_detail" my={2}>
                <Grid container spacing={3}>
                    <Grid item lg={2}>
                        <Box>
                            <Typography className='info_txt'>Private Standard Car </Typography>
                            <Link className='link_txt'>More Info</Link>
                        </Box>
                    </Grid>
                    <Grid item lg={2}>
                        <Box>
                            <Typography className='info_txt'>0 Hr 30 Min</Typography>
                        </Box>
                    </Grid>
                    <Grid item lg={2}>
                        <Box>
                            <Typography className='info_txt' textAlign='center'>Private Standard Minibus</Typography>
                        </Box>
                    </Grid>
                    <Grid item lg={2}>
                        <Box>
                            <Typography className='info_txt'>12</Typography>
                        </Box>
                    </Grid>
                    <Grid item lg={1}>
                        <Box>
                            <Typography className='info_txt'>12</Typography>
                        </Box>
                    </Grid>
                    <Grid item lg={3} display='flex' justifyContent='space-between'>
                        <Box>
                            <Typography sx={{color:'#FF8900', fontSize:'14px',fontWeight:'bold'}}>Rs 1040</Typography>
                        </Box>
                        <form action='TansferGuestDetail'>
                        <Box>
                           <Button variant='contained' type='submit' sx={{backgroundColor:'#006FFF',borderRadius:'10px'}}>Book</Button>
                        </Box>
                        </form>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default TrasferDetail
