import { Button, Typography } from '@mui/material'
import "./insurancesearchcriteria.css";
import { borderBottom, Box } from '@mui/system'
import React from 'react'
import luggage from "../../../Images/luggage.png";
import schedule from "../../../Images/schedule.png";
import unitednations from "../../../Images/unitednations.png";
import couple from "../../../Images/couple.png";
import age from "../../../Images/age.png";



const InsuranceSearchCriteria = () => {
  return (
    <div className='Insurance_header'>
      <Box p={2}>
        <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: '#252525', borderBottom: '1px solid grey' }} textAlign='center'>Search Criteria</Typography>
        <Box sx={{ display: 'flex', marginY: "15px" }}>
          <img src={luggage} alt="" />
          <Typography className="list_text">Single Trip</Typography>
        </Box>
        <Box sx={{ display: 'flex', marginY: "15px" }}>
          <img className='Calender' src={schedule} alt="" />
          <Typography className="list_text">11 Days(s) (21 Jan, 2023-25 Jan, 2023)</Typography>
        </Box>
        <Box sx={{ display: 'flex', marginY: "15px" }}>
          <img src={unitednations} alt="" />
          <Typography className="list_text">Indian</Typography>
        </Box>
        <Box sx={{ display: 'flex', marginY: "15px" }}>
          <img src={couple} alt="" />
          <Typography className="list_text">1 Adult</Typography>
        </Box>
        <Box sx={{ display: 'flex', marginY: "15px" }}>
          <img src={age} alt="" />
          <Typography className="list_text">23</Typography>
        </Box>
        <Box sx={{ display: "flex", marginY: "15px", justifyContent: 'center' }}>
          <Button variant='contained' type='submit' sx={{ background: '#006FFF', borderRadius: '10px' }}>Modify Search</Button>
        </Box>
      </Box>
    </div>
  )
}

export default InsuranceSearchCriteria;
