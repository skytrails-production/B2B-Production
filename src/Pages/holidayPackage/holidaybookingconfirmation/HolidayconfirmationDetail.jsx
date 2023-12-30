import React from 'react'
import { Box, Typography, Button, Grid } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Input from "@mui/material/Input";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import EngineeringIcon from "@mui/icons-material/Engineering";
import mainImage from "../../../Images/mainImage.png";
import HolidayRating from "../holidaypackageresult/HolidayRating";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import FastfoodIcon from "@mui/icons-material/Fastfood";

const HolidayconfirmationDetail = () => {
  return (
    <Box>
      <Box className="main-head">
        <Typography className="holiday_txt">
          Amazing Goa Flight Inclusive Deal 3N
        </Typography>
        <Typography className="holiday_txt_b">1 Room - 2 Adults</Typography>
        <Typography className="holiday_txt_b">
          Feb 28, 2023
          <Typography fontSize="10px" color="#FF8900" px={1}>
            4D/3N
          </Typography>
          Mar 3, 2023 / From New Delhi
        </Typography>
      </Box>
      <Box className="main-head" mt={2}>
        <Typography className="holiday_txt">Traveller Details</Typography>
        <Typography className="holiday_txt_b" py={1}>
          2 Travellers
          <Typography fontSize="14px" fontWeight="bold" color="#006FFF" px={1}>
            - 1 Room | 2 Adults
          </Typography>
        </Typography>
        <Typography className="holiday_txt_v">Traveller 1 (Adult)</Typography>
        <Box>
          <Box mt={1} display="flex">
            <Typography
              sx={{
                fontSize: "16px",
                color: "#666666",
                cursor: "pointer",
              }}
            >
              Name:
            </Typography>
            <Typography
             ml={1}
              sx={{
                fontSize: "16px",
                color: "#666666",
                cursor: "pointer",
              }}
            >
             Dheeraj Vishwakarma
            </Typography>
            
           
           
          </Box>
          <Box mt={1} display="flex">
            <Typography
              sx={{
                fontSize: "16px",
                color: "#666666",
                cursor: "pointer",
              }}
            >
             Date of Birth:
            </Typography>
            <Typography
             ml={1}
              sx={{
                fontSize: "16px",
                color: "#666666",
                cursor: "pointer",
              }}
            >
             02th Jun, 1998
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                color: "#666666",
                cursor: "pointer",
              }}
              ml={3}
            >
             Gender:
            </Typography>
            <Typography
             ml={1}
              sx={{
                fontSize: "16px",
                color: "#666666",
                cursor: "pointer",
              }}
            >
            Male
            </Typography>
            
           
           
          
          </Box>
        </Box>
        <Typography className="holiday_txt_v">Traveller 2 (Adult)</Typography>
        <Box>
          <Box mt={1} display="flex">
            <Typography
              sx={{
                fontSize: "16px",
                color: "#666666",
                cursor: "pointer",
              }}
            >
              Name:
            </Typography>
            <Typography
             ml={1}
              sx={{
                fontSize: "16px",
                color: "#666666",
                cursor: "pointer",
              }}
            >
             Dheeraj Vishwakarma
            </Typography>
            
           
           
          </Box>
          <Box mt={1} display="flex">
            <Typography
              sx={{
                fontSize: "16px",
                color: "#666666",
                cursor: "pointer",
              }}
            >
             Date of Birth:
            </Typography>
            <Typography
             ml={1}
              sx={{
                fontSize: "16px",
                color: "#666666",
                cursor: "pointer",
              }}
            >
             02th Jun, 1998
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                color: "#666666",
                cursor: "pointer",
              }}
              ml={3}
            >
             Gender:
            </Typography>
            <Typography
             ml={1}
              sx={{
                fontSize: "16px",
                color: "#666666",
                cursor: "pointer",
              }}
            >
            Male
            </Typography>
            
           
           
          </Box>
          
        </Box>
        <Box py={1}>
          <Typography fontSize="16px" fontWeight="bold" color="#006FFF">
          Contact Details
          </Typography>
          <Box mt={2} display="flex">
          <Typography
             ml={1}
              sx={{
                fontSize: "16px",
                color: "#666666",
                cursor: "pointer",
              }}
            >
            Email:
            </Typography>
          <Typography
             ml={1}
              sx={{
                fontSize: "16px",
                color: "#666666",
                cursor: "pointer",
              }}
            >
            abc@gmail.com
            </Typography>
          <Typography
             ml={2}
              sx={{
                fontSize: "16px",
                color: "#666666",
                cursor: "pointer",
              }}
            >
            Mobile Number:
            </Typography>
          <Typography
             ml={1}
              sx={{
                fontSize: "16px",
                color: "#666666",
                cursor: "pointer",
              }}
            >
            +91 98712 34561
            </Typography>
           
          
           
          </Box>
        </Box>
      </Box>

      <Box className="main-head" my={2}>
        <Typography fontSize="16px" color="black" fontWeight="bold" px={1}>
          Special Requests
        </Typography>
        <Box my={1} width='100%' border='1px solid #70707057' borderRadius='20px'>
        <Typography  sx={{
                color: "#252525",
                fontSize: "12px",
                fontWeight: "bold",
                margin: "10px",
              }}>Extra seat(s) at the wish of a passenge</Typography>
          
        </Box>
      </Box>

      <Box className="main-head" my={2}>
        <Typography className="holiday_txt" textDecoration="underline">
          
        </Typography>
        <Typography className="holiday_txt_b" py={1}>
          Itinerary
          <Typography fontSize="14px" fontWeight="bold" color="#006FFF" px={1}>
            / 2 Flight / 1 Hotel / 2 Transfers
          </Typography>
        </Typography>
        <Box>
          <Box display="flex" justifyContent="space-between">
            <Typography
              sx={{
                color: "#FF8900",
                fontSize: "16px",
                fontWeight: "bold",
                marginY: "10px",
              }}
            >
              Day 1
            </Typography>
            <Typography
              sx={{
                color: "#666666",
                fontSize: "16px",
                fontWeight: "bold",
                marginY: "10px",
              }}
            >
              23rd Feb, 2023
            </Typography>
          </Box>

          <Box>
            <Grid container py={2}>
              <Grid md={6}>
                <Typography className="holiday_txt_b" py={1}>
                  Onward Flight
                </Typography>
                <Box display="flex" justifyContent="space-around">
                  <Box>
                    <Typography className="h_time">04:55</Typography>
                    <Typography className="h_address">New Delhi</Typography>
                    <Typography className="h_address">Tue, 29 Feb</Typography>
                  </Box>
                  <Box>
                    <FlightTakeoffIcon sx={{ color: "#25B1CA" }} />
                  </Box>
                  <Box display="flex" justifyContent="space-around">
                    <Box>
                      <Typography className="r_address">09h 15m</Typography>
                      <Typography className="r_address">
                        1 Stop via Jaipur
                      </Typography>
                    </Box>
                  </Box>

                  <Box>
                    <FlightLandIcon sx={{ color: "#25B1CA" }} />
                  </Box>
                  <Box>
                    <Typography className="p_time">04:55</Typography>
                    <Typography className="p_address">New Delhi</Typography>
                    <Typography className="p_address">Tue, 29 Feb</Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid md={6}></Grid>
            </Grid>
          </Box>

          <Box>
            <Typography className="holiday_txt_b">Transfer</Typography>
            <Box
              sx={{ padding: "10px", display: "flex", alignItems: "center" }}
              ml={2}
            >
              <EngineeringIcon />
              <Typography
                sx={{ fontSize: "12px", color: "#252525", fontWeight: "bold" }}
                ml={1}
              >
                Transfer:
              </Typography>
              <Typography
                sx={{ fontSize: "12px", color: "#FF8900", fontWeight: "bold" }}
                ml={1}
              >
                Airport to hotel in Goa | 1 hrs
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography className="holiday_txt_b">Hotel Stay</Typography>

            <Grid container p={2}>
              <Grid item lg={6}>
                <Box display="flex" ml={2}>
                  <Box sx={{ width: "20%", height: "30%" }}>
                    <img src={mainImage} className="flight_img" />
                  </Box>
                  <Box px={2}>
                    <Typography
                      color="#252525"
                      fontSize="12px"
                      fontWeight="bold"
                    >
                      WelcomHotel Dwarka - Member ITC Hotel Group
                    </Typography>
                    <HolidayRating />
                    <Typography
                      color="#252525"
                      fontSize="10px"
                      fontWeight="bold"
                    >
                      Check in - Tue, 28 Feb 2023 Check out - Fri, 3 Mar 2023
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item lg={6}>
                <Box ml={2}>
                  <Typography color="#252525" fontSize="14px" fontWeight="bold">
                    Room Type Deluxe Room Special x 1
                  </Typography>
                  <Typography color="#252525" fontSize="10px" fontWeight="bold">
                    Room Type Deluxe Room Special x 1
                  </Typography>
                  <Box display="flex" textAlign="center">
                    <FileDownloadDoneIcon style={{ color: "#26A202" }} />
                    <Typography
                      color="#252525"
                      fontSize="14px"
                      fontWeight="bold"
                      ml={1}
                    >
                      Breakfast Included
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography
              sx={{
                color: "#FF8900",
                fontSize: "16px",
                fontWeight: "bold",
                marginY: "10px",
              }}
            >
              Day 2
            </Typography>
            <Typography
              sx={{
                color: "#666666",
                fontSize: "16px",
                fontWeight: "bold",
                marginY: "10px",
              }}
            >
              24rd Feb, 2023
            </Typography>
          </Box>
          <Box>
            <Typography className="holiday_txt_b">Day Meals</Typography>
            <Box
              sx={{ padding: "10px", display: "flex", alignItems: "center" }}
              ml={2}
            >
              <FastfoodIcon />
              <Typography
                sx={{ fontSize: "12px", color: "#252525", fontWeight: "bold" }}
                ml={1}
              >
                Breakfast:
              </Typography>
              <Typography
                sx={{ fontSize: "12px", color: "#FF8900", fontWeight: "bold" }}
                ml={1}
              >
                Included at Hotel
              </Typography>
            </Box>
          </Box>

          <Box>
            <Typography
              sx={{
                paddingX: "10px",
                fontSize: "12px",
                color: "#252525",
                fontWeight: "bold",
              }}
              ml={2}
            >
              Day at Leisure
            </Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography
              sx={{
                color: "#FF8900",
                fontSize: "16px",
                fontWeight: "bold",
                marginY: "10px",
              }}
            >
              Day 3
            </Typography>
            <Typography
              sx={{
                color: "#666666",
                fontSize: "16px",
                fontWeight: "bold",
                marginY: "10px",
              }}
            >
              24rd Feb, 2023
            </Typography>
          </Box>
          <Box>
            <Typography className="holiday_txt_b">Day Meals</Typography>
            <Box
              sx={{ padding: "10px", display: "flex", alignItems: "center" }}
              ml={2}
            >
              <FastfoodIcon />
              <Typography
                sx={{ fontSize: "12px", color: "#252525", fontWeight: "bold" }}
                ml={1}
              >
                Breakfast:
              </Typography>
              <Typography
                sx={{ fontSize: "12px", color: "#FF8900", fontWeight: "bold" }}
                ml={1}
              >
                Included at Hotel
              </Typography>
            </Box>
            <Typography
              sx={{
                paddingX: "10px",
                fontSize: "12px",
                color: "#252525",
                fontWeight: "bold",
              }}
              ml={1}
            >
              Checkout from Hotel in Goa
            </Typography>

            <Box
              sx={{ padding: "10px", display: "flex", alignItems: "center" }}
              ml={2}
            >
              <EngineeringIcon />

              <Typography
                sx={{ fontSize: "12px", color: "#FF8900", fontWeight: "bold" }}
                ml={1}
              >
                Included at Hotel | 1 hrs
              </Typography>
            </Box>
            <Box>
              <Grid container py={2}>
                <Grid md={6}>
                  <Typography className="holiday_txt_b" py={1}>
                    Return Flight
                  </Typography>
                  <Box display="flex" justifyContent="space-around">
                    <Box>
                      <Typography className="h_time">04:55</Typography>
                      <Typography className="h_address">New Delhi</Typography>
                      <Typography className="h_address">Tue, 29 Feb</Typography>
                    </Box>
                    <Box>
                      <FlightTakeoffIcon sx={{ color: "#25B1CA" }} />
                    </Box>
                    <Box display="flex" justifyContent="space-around">
                      <Box>
                        <Typography className="r_address">09h 15m</Typography>
                        <Typography className="r_address">
                          1 Stop via Jaipur
                        </Typography>
                      </Box>
                    </Box>

                    <Box>
                      <FlightLandIcon sx={{ color: "#25B1CA" }} />
                    </Box>
                    <Box>
                      <Typography className="p_time">04:55</Typography>
                      <Typography className="p_address">New Delhi</Typography>
                      <Typography className="p_address">Tue, 29 Feb</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid md={6}></Grid>
              </Grid>
            </Box>
            <Box>
              <Typography className="holiday_txt_b" py={1}>
                Package Exclusions
              </Typography>
              <ul>
                <li>Expenses of personal nature</li>
                <li>Mentioned cost is not valid between 6 pm and 8 am</li>
                <li>Anything not mentioned under inclusions</li>
                <li>
                  Package price does not include Gala dinner charges applicable
                  on Christmas and New Year's Eve
                </li>
              </ul>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="main-head" mt={2}>
        <Typography className="holiday_txt" textDecoration="underline">
          Cancellation & Date Change
        </Typography>
        <Typography
          sx={{ fontSize: "16px", color: "#666666", fontWeight: "bold" }}
        >
          Package Cancellation Policy
        </Typography>
        <Typography
          sx={{ fontSize: "16px", color: "#252525", fontWeight: "bold" }}
        >
          Cancellation & Charges:
        </Typography>
        <Box display="flex" justifyContent="space-between" my={1}>
          <Box>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#252525",
                fontWeight: "300",
                textAlign: "left",
              }}
            >
              Cancellation Time
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#006FFF",
                fontWeight: "300",
                textAlign: "left",
              }}
            >
              Till 03 Feb 23
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#006FFF",
                fontWeight: "300",
                textAlign: "left",
              }}
            >
              After 03 Feb 23
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#252525",
                fontWeight: "300",
                textAlign: "right",
              }}
            >
              Cancellation Charges
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#FF8900",
                fontWeight: "300",
                textAlign: "right",
              }}
            >
              ₹2,000 Cancellation Fee
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#FF8900",
                fontWeight: "300",
                textAlign: "right",
              }}
            >
              Non Refundable
            </Typography>
          </Box>
        </Box>
        <Typography
          sx={{
            fontSize: "12px",
            color: "#666666",
            fontWeight: "300",
            textAlign: "left",
          }}
        >
          Note: These are non-refundable amounts as per the current components
          attached. In the case of component change/modifications, the policy
          will change accordingly.
        </Typography>
        <Typography
          sx={{ fontSize: "16px", color: "#666666", fontWeight: "bold" }}
        >
          Package Cancellation Policy
        </Typography>
        <Box display="flex" justifyContent="space-between" my={1}>
          <Box>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#252525",
                fontWeight: "300",
                textAlign: "left",
              }}
            >
              Date Change Possible
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#006FFF",
                fontWeight: "300",
                textAlign: "left",
              }}
            >
              Till 03 Feb 23
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#006FFF",
                fontWeight: "300",
                textAlign: "left",
              }}
            >
              After 03 Feb 23
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#252525",
                fontWeight: "300",
                textAlign: "right",
              }}
            >
              Date Change
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#FF8900",
                fontWeight: "300",
                textAlign: "right",
              }}
            >
              ₹0 Date Change Fee
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                color: "#FF8900",
                fontWeight: "300",
                textAlign: "right",
              }}
            >
              Date cannot be changed
            </Typography>
          </Box>
        </Box>
        <Typography
          sx={{
            fontSize: "12px",
            color: "#666666",
            fontWeight: "300",
            textAlign: "left",
          }}
        >
          Note: These are non-refundable amounts as per the current components
          attached. In the case of component change/modifications, the policy
          will change accordingly. Date Change fees don't include any fare
          change in the components on the new date. Fare difference as
          applicable will be charged separately. Date Change will depend on the
          availability of the components on the new requested date.
        </Typography>
      </Box>
     <form action="/">
     <Box mt={2} textAlign='center'>
        <Button variant="contained" type='submit' style={{borderRadius:'10px'}}>Print</Button>
      </Box>
     </form>
    </Box>
  )
}

export default HolidayconfirmationDetail
