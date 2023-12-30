import SightseeingStepper from '../../../Components/SightseeingStepper';
import React from 'react';
import { Button, Box, Grid, Typography,Link } from '@mui/material';
import "./sightseeingresult.css";
import Sightseeingsearch from './Sightseeingsearchleft';
import SightseeingDetail from './SightseeingDetail';

const SightseeingResult = () => {
    return (
        <div className="flightContainer">
            <SightseeingStepper />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Box>
                            <Sightseeingsearch/>
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                    <Box className='sorting_booking' display='flex' justifyContent="space-between">
                            <Box display='flex' justifyContent="space-around"  width='300px'>
                                    <Typography sx={{fontSize:'12px' , color:'#252525', fontWeight:'bold'}}>Sort By:</Typography>
                                    <Typography sx={{fontSize:'12px' , color:'#252525', fontWeight:'bold'}}>Price</Typography>
                                    <Typography sx={{fontSize:'12px' , color:'#252525', fontWeight:'bold'}}>Name</Typography>
                            </Box>
                       
                       <Box>
                            <Link>Showing 356 Result</Link>
                        </Box>
                    </Box>
                    <SightseeingDetail/>
                    <SightseeingDetail/>
                    <SightseeingDetail/>
                    <SightseeingDetail/>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
}

export default SightseeingResult
