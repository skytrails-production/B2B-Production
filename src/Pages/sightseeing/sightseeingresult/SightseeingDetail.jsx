import React from "react";
import { Grid, Box, Typography, Button, Link } from "@mui/material";
import mainImage from "../../../Images/mainImage.png";
import FlightIcon from "@mui/icons-material/Flight";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import RowingIcon from "@mui/icons-material/Rowing";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";

import color from "../../../color/color"
const SightseeingDetail = () => {
  return (
    <div>
      <Box
        p={3}
        mt={3}
        backgroundColor="#FCFFFF"
        boxShadow="1px 1px 8px gray"
        borderRadius="10px"
        alignItems="center"
      >
        <Grid container alignItems="center">
          <Grid md={7} sm={6}>
            <Box display="flex" alignItems="center">
              <Box sx={{ width: "20%", height: "30%" }}>
                <img src={mainImage} className="flight_img" />
              </Box>
              <Box px={1}>
                <Typography className="hotel_name">
                  Vondelpark and Old West Neighbourhood Walking Audio Tour By
                  VoiceMap
                </Typography>
                <Typography color="#FF8900" fontSize="10px" fontWeight="bold">
                  (Price may be change as per the supplier response)
                </Typography>
                <Link color="#006FFF" fontSize="10px" fontWeight="bold">
                  Find Out More
                </Link>
              </Box>
            </Box>
          </Grid>
          <Grid md={5} sm={6} display="flex">
            <Box display="flex" justifyContent="right" width="100%">
              <Box display="block" alignItems="right" textAlign="end">
                <Typography color="#006FFF" fontSize="18px" fontWeight="bold">
                  ₹354
                </Typography>
                <Typography color="#FF8900" fontSize="8px" fontWeight="bold">
                  per person
                </Typography>
                <form action="/">
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{borderRadius: "10px" }}
                    style={{backgroundColor:color.bluedark}}
                  >
                    <Typography color="white" fontSize="10px" >
                      Check Availability
                    </Typography>
                  </Button>
                </form>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        p={3}
        mt={3}
        backgroundColor="#FCFFFF"
        boxShadow="1px 1px 8px gray"
        borderRadius="10px"
        alignItems="center"
      >
        <Grid container alignItems="center">
          <Grid md={7} sm={6}>
            <Box display="flex" alignItems="center">
              <Box sx={{ width: "20%", height: "30%" }}>
                <img src={mainImage} className="flight_img" />
              </Box>
              <Box px={1}>
                <Typography className="hotel_name">
                  Vondelpark and Old West Neighbourhood Walking Audio Tour By
                  VoiceMap
                </Typography>
                <Typography color="#FF8900" fontSize="10px" fontWeight="bold">
                  (Price may be change as per the supplier response)
                </Typography>
                <Link color="#006FFF" fontSize="10px" fontWeight="bold">
                  Find Out More
                </Link>
              </Box>
            </Box>
          </Grid>
          <Grid md={5} sm={6} display="flex">
            <Box display="flex" justifyContent="right" width="100%">
              <Box display="block" alignItems="right" textAlign="end">
                <Typography color="#006FFF" fontSize="18px" fontWeight="bold">
                  ₹354
                </Typography>
                <Typography color="#FF8900" fontSize="8px" fontWeight="bold">
                  per person
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container my={2}>
          <Grid sm={2}>
            <Typography
              sx={{ fontSize: "12px", color: "#252525", fontWeight: "bold" }}
            >
              Language
            </Typography>
            <Typography
              sx={{ fontSize: "12px", color: "#252525", fontWeight: "bold" }}
            >
              English - Audio
            </Typography>
          </Grid>
          <Grid sm={6}>
            <Typography
              sx={{ fontSize: "12px", color: "#252525", fontWeight: "bold" }}
            >
              Option
            </Typography>
            <Typography
              sx={{ fontSize: "12px", color: "#252525", fontWeight: "bold" }}
            >
              Vondepark and Old West Neighbourhood: A Self-Guided Audio Tour
            </Typography>
          </Grid>
          <Grid sm={1}>
            <Typography
              sx={{ fontSize: "12px", color: "#252525", fontWeight: "bold" }}
            >
              Duration
            </Typography>
            <Typography
              sx={{ fontSize: "12px", color: "#252525", fontWeight: "bold" }}
            >
              1 Hour
            </Typography>
          </Grid>
          <Grid sm={1}>
            <Typography
              sx={{ fontSize: "12px", color: "#252525", fontWeight: "bold" }}
            >
              Price
            </Typography>
            <Typography
              sx={{ fontSize: "12px", color: "#252525", fontWeight: "bold" }}
            >
              Rs. ₹2345
            </Typography>
          </Grid>
          <Grid sm={2} textAlign="right">
            <form action="./SightseeingGuestDetail">
              <Button
                variant="contained"
                type="submit"
                sx={{ borderRadius: "10px" }}
                style={{backgroundColor:color.bluedark}}
              >
                <Typography color="white" fontSize="10px">
                  Book Now
                </Typography>
              </Button>
            </form>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default SightseeingDetail;
