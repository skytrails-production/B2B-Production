import React from 'react'
import TransferStepper from '../../../Components/TransferStepper'
import { Button, Box, Grid, Typography, Link } from '@mui/material';
import building from "../../../Images/building.png";
import location from "../../../Images/location.png";
import schedule from "../../../Images/schedule.png";
import couple from "../../../Images/couple.png";
import unitednations from "../../../Images/unitednations.png";
import translate from "../../../Images/translate.png";
import clock from "../../../Images/clock.png";
import { Divider } from '@mui/material';
import Checkbox from "@mui/material/Checkbox";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import "./transferresult.css";
import TransferDetail from "./TrasferDetail";




const label = { inputProps: { "aria-label": "Checkbox demo" } };


const TransferResult = () => {
  return (
    <div className='flightContainer'>
      <TransferStepper />
      <Box p={2} my={2}>
        <Grid container spacing={3}>
          <Grid item lg={3}>
            <Box>
              <div className='sight_header'>
                <Box p={2}>
                  <Typography sx={{ fontSize: '16px', fontWeight: 'bold', color: '#252525', }} textAlign='center'>Your Transfer Search</Typography>
                  <Divider sx={{ backgroundColor: "gray", marginY: "5px" }} />
                  <Box sx={{ display: "flex", marginY: "15px" }}>
                    <img src={building} />
                    <Typography className="list_text">Bali, Indonesia</Typography>
                  </Box>
                  <Box sx={{ display: "flex", marginY: "15px" }}>
                    <img src={location} />
                    <Typography className="list_text">Bali International Airport</Typography>
                  </Box>
                  <Box sx={{ display: "flex", marginY: "15px" }}>
                    <img src={location} />
                    <Typography className="list_text">Port: Bali </Typography>
                  </Box>
                  <Box sx={{ display: "flex", marginY: "15px" }}>
                    <img src={clock} />
                    <Typography className="list_text">10:00 hrs</Typography>
                  </Box>
                  <Box sx={{ display: "flex", marginY: "15px" }}>
                    <img src={schedule} />
                    <Typography className="list_text">(05 Feb, 2023)</Typography>
                  </Box>
                  <Box sx={{ display: "flex", marginY: "15px" }}>
                    <img src={unitednations} />
                    <Typography className="list_text">Indian</Typography>
                  </Box>
                  <Box sx={{ display: "flex", marginY: "15px" }}>
                    <img src={translate} />
                    <Typography className="list_text">English</Typography>
                  </Box>

                  <Box sx={{ display: "flex", marginY: "15px" }}>
                    <img src={couple} />
                    <Typography sx={{ fontSize: '12px', fontWeight: 'bold', color: '#252525', }} ml={1}>2 Adults</Typography>
                  </Box>

                  <Box sx={{ display: "flex", marginY: "15px", justifyContent: 'center' }}>
                    <Button variant='contained' type='submit' sx={{ background: '#006FFF', borderRadius: '10px' }}>Modify Search</Button>
                  </Box>


                </Box>
              </div>
            </Box>
          </Grid>
          <Grid item lg={9} >
            <Box className="transfer_top">
              <Grid container spacing={3}>
                <Grid item lg={2}>
                  <Box>
                    <Typography className='info_txt'>Service Description</Typography>
                    {/* <Link className='link_txt'>More Info</Link> */}
                  </Box>
                </Grid>
                <Grid item lg={2}>
                  <Box>
                    <Typography className='info_txt'>Service Duration</Typography>
                  </Box>
                </Grid>
                <Grid item lg={2}>
                  <Box>
                    <Typography className='info_txt' textAlign='center'>Vehicle</Typography>
                  </Box>
                </Grid>
                <Grid item lg={2}>
                  <Box>
                    <Typography className='info_txt'>Max Passenger</Typography>
                  </Box>
                </Grid>
                <Grid item lg={2}>
                  <Box>
                    <Typography className='info_txt'>Max Luggage</Typography>
                  </Box>
                </Grid>
                <Grid item lg={2}>
                <Box>
                    <Typography className='info_txt'>Total Price </Typography>
                    <Typography sx={{fontSize:'10px',fontWeight:'bold',}}>(Exclusive of Service Tax) </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box py={2}>
            <TransferDetail/>
            <TransferDetail/>
            <TransferDetail/>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}

export default TransferResult
