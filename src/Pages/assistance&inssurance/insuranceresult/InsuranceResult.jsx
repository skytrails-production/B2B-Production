import React from 'react'
import { Button, Box, Grid, Typography,Link } from '@mui/material';
import InssuranceStepper from '../../../Components/InssuranceStepper'
import InsuranceSearchCriteria from './InsuranceSearchCriteria';
import InsuranceResultDetail from './InsuranceResultDetail';

const InsuranceResult = () => {
  return (
    <div className='flightContainer'>
      <InssuranceStepper/>
      <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Box>
                            <InsuranceSearchCriteria/>
                        </Box>
                    </Grid>
                    <Grid item xs={9}>
                    <InsuranceResultDetail/>
                    <InsuranceResultDetail/>
                    <InsuranceResultDetail/>
                    </Grid>
                </Grid>
            </Box>
    </div>
  )
}

export default InsuranceResult
