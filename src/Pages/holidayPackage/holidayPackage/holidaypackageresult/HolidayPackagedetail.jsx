import React from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import mainImage from "../../../Images/mainImage.png";
import FlightIcon from "@mui/icons-material/Flight";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import RowingIcon from "@mui/icons-material/Rowing";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { useSelector } from "react-redux";

const HolidayPackagedetail = () => {
  const reducerState = useSelector((state) => state);
  // console.log("holiday details",reducerState?.searchResult?.packageSearchResult?.data?.data?.pakage);
  const filteredPackage =
    reducerState?.searchResult?.packageSearchResult?.data?.data?.pakage;
  // console.log("----------------------------");
  // console.log("Flitered", filteredPackage);
  return (
    <div>
      <Box
        p={5}
        mt={3}
        backgroundColor="#F5F5F5"
        boxShadow="1px 1px 8px gray"
        borderRadius="10px"
        alignItems="center"
      >
        <Grid container alignItems="center">
          {filteredPackage.map((ele, index) => {
            <>
              <Grid md={7} sm={6}>
                <Box display="flex" alignItems="center">
                  <Box sx={{ width: "20%", height: "30%" }}>
                    <img src={mainImage} className="flight_img" />
                  </Box>
                  <Box px={1}>
                    <Typography className="hotel_name">
                      Luxurious Honeymoon in Goa
                    </Typography>
                    <Typography
                      color="#FF8900"
                      fontSize="10px"
                      fontWeight="bold"
                    >
                      3N/4D (Goa)
                    </Typography>
                    <Typography
                      color="#666666"
                      fontSize="10px"
                      fontWeight="bold"
                    >
                      o North Goa Sightseeing
                    </Typography>
                    <Typography
                      color="#666666"
                      fontSize="10px"
                      fontWeight="bold"
                    >
                      {" "}
                      o Dinner Cruise
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid md={5} sm={6} display="flex" justifyContent="space-between">
                <Box display="flex" justifyContent="space-between" width="100%">
                  <Box
                    display="flex"
                    justifyContent="space-around"
                    width="50%"
                    mt={3}
                  >
                    <Box textAlign="center">
                      <FlightIcon />
                      <Typography
                        color="#006FFF"
                        fontSize="8px"
                        fontWeight="bold"
                      >
                        2 Flights
                      </Typography>
                    </Box>
                    <Box textAlign="center">
                      <LocationCityIcon />
                      <Typography
                        color="#006FFF"
                        fontSize="8px"
                        fontWeight="bold"
                      >
                        1 Hotel
                      </Typography>
                    </Box>
                    <Box textAlign="center">
                      <RowingIcon />
                      <Typography
                        color="#006FFF"
                        fontSize="8px"
                        fontWeight="bold"
                      >
                        1 Activity
                      </Typography>
                    </Box>
                    <Box textAlign="center">
                      <TransferWithinAStationIcon />
                      <Typography
                        color="#006FFF"
                        fontSize="8px"
                        fontWeight="bold"
                      >
                        1 Transfer
                      </Typography>
                    </Box>
                  </Box>
                  <Box display="block" alignItems="center" textAlign="end">
                    <Typography
                      color="#006FFF"
                      fontSize="18px"
                      fontWeight="bold"
                    >
                      ₹354654
                    </Typography>
                    <Typography
                      color="#FF8900"
                      fontSize="8px"
                      fontWeight="bold"
                    >
                      Publisher Price: ₹354654
                    </Typography>
                    <form action="./Holidaybooknow">
                      <Button variant="contained" type="submit">
                        <Typography color="white" fontSize="10px">
                          Get Details
                        </Typography>
                      </Button>
                    </form>
                  </Box>
                </Box>
              </Grid>
            </>;
          })}
        </Grid>
      </Box>
    </div>
  );
};

export default HolidayPackagedetail;
