import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import FlightIcon from "@mui/icons-material/Flight";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import RowingIcon from "@mui/icons-material/Rowing";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import HolidayRating from "../holidaypackageresult/HolidayRating";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import information from "../../../Images/information.png";

import "./holidaybooknowdetail.css";
import { textAlign } from "@mui/system";
import { Divider } from "@chakra-ui/react";

const Bookingdetailpackage = () => {
  return (
    <Box className="header_top">
      <Box mt={3} alignItems="center">
        <Grid container alignItems="center">
          <Grid md={7} sm={6}>
            <Box display="flex" alignItems="center">
              <Box sx={{ width: "20%", height: "30%" }}>
                <img src="skyTrails" alt="skyTrails" className="flight_img" />
              </Box>
              <Box px={1}>
                <Typography className="hotel_name">
                  Luxurious Honeymoon in Goa
                </Typography>
                <Typography color="#FF8900" fontSize="10px" fontWeight="bold">
                  3N/4D (Goa)
                </Typography>
                <Typography color="#666666" fontSize="10px" fontWeight="bold">
                  o North Goa Sightseeing
                </Typography>
                <Typography color="#666666" fontSize="10px" fontWeight="bold">
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
                  <Typography color="#006FFF" fontSize="8px" fontWeight="bold">
                    2 Flights
                  </Typography>
                </Box>
                <Box textAlign="center">
                  <LocationCityIcon />
                  <Typography color="#006FFF" fontSize="8px" fontWeight="bold">
                    1 Hotel
                  </Typography>
                </Box>
                <Box textAlign="center">
                  <RowingIcon />
                  <Typography color="#006FFF" fontSize="8px" fontWeight="bold">
                    1 Activity
                  </Typography>
                </Box>
                <Box textAlign="center">
                  <TransferWithinAStationIcon />
                  <Typography color="#006FFF" fontSize="8px" fontWeight="bold">
                    1 Transfer
                  </Typography>
                </Box>
              </Box>
              <Box display="block" alignItems="center" textAlign="end">
                <Typography color="#006FFF" fontSize="18px" fontWeight="bold">
                  ₹354654
                </Typography>
                <Typography color="#FF8900" fontSize="8px" fontWeight="bold">
                  Publisher Price: ₹354654
                </Typography>
                <form action="/HolidayGuestDetail">
                  <Box textAlign="right">
                    <Button
                      variant="contained"
                      textAlign="center"
                      display="flex"
                      justifyContent="center"
                      type="submit"
                    >
                      Book Now
                    </Button>
                  </Box>
                </form>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Typography
          sx={{ color: "#006FFF", fontSize: "16px", fontWeight: "bold" }}
          py={2}
        >
          Overview
        </Typography>
        <Typography
          sx={{ color: "#666666", fontSize: "12px", fontWeight: "bold" }}
        >
          Plan a memorable trip to the Southern state of Kerala that boasts of
          natural beauty in abundance. Start your exhilarating experience with a
          visit to Munnar - a hill station with verdant valleys and expansive
          tea estates. Later, travel to Thekkady and explore its aromatic spice
          plantations. Here, enjoy a boat ride and partake in several adventure
          activities, like trekking and rock climbing in the Periyar Wildlife
          Sanctuary to make your trip a fun-filled one.
        </Typography>
      </Box>
      <Box className="header_top">
        <Box>
          <Typography
            sx={{
              color: "#006FFF",
              fontSize: "16px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "underline",
            }}
          >
            Day Plan
          </Typography>
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
        </Box>
        <Box>
          <Grid container p={2}>
            <Grid md={6}>
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
            <Grid md={6}>
              <Box display="flex" ml={2}>
                <Box sx={{ width: "20%", height: "30%" }}>
                  <img src="skyTrails" alt="skyTrails" className="flight_img" />
                </Box>
                <Box px={2}>
                  <Typography color="#252525" fontSize="12px" fontWeight="bold">
                    WelcomHotel Dwarka - Member ITC Hotel Group
                  </Typography>
                  <HolidayRating />
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            py={3}
          >
            <FastfoodIcon sx={{ color: "#25B1CA", marginRight: "10px" }} />
            <Typography color="#252525" fontSize="12px" fontWeight="bold">
              Meal Plan:
            </Typography>
            <Typography color="#FF8900" fontSize="12px" fontWeight="bold">
              Meals as per hotel plan
            </Typography>
          </Box>
          <Box>
            <Box display="flex">
              <Typography color="#006FFF" fontSize="12px" fontWeight="bold">
                Day 1 -
              </Typography>
              <Typography color="#252525" fontSize="12px" fontWeight="bold">
                Arrive in Cochin | Drive from Cochin to Munnar (135 km/approx. 5
                hours)
              </Typography>
            </Box>
            <Typography color="#666666" fontSize="12px" fontWeight="bold">
              Upon arrival at the Cochin Airport, a skyTrails representative will
              be there to greet you and provide assistance in boarding the
              designated vehicle that will drive you to Munnar. An exotic
              location, Munnar is popular across the country for its tea
              plantations sprawling across its diverse landscape. With lush
              green valleys and rolling hills, the region is an idyllic getaway
              for nature lovers. After a comfortable journey from the airport to
              the hotel in Munnar, check-in and take some rest. You can spend
              the remaining day either relaxing in the hotel room or going for a
              nature walk in the beautiful surroundings of this hill station.
              Retire to the hotel in the evening to stay overnight.
            </Typography>
          </Box>
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
        </Box>
        <Box>
          <Grid container p={2}>
            <Grid md={6}>
              <Box display="flex" ml={2}>
                <Box sx={{ width: "20%", height: "30%" }}>
                  <img src="skyTrails" alt="skyTrails" className="flight_img" />
                </Box>
                <Box px={2}>
                  <Typography color="#252525" fontSize="12px" fontWeight="bold">
                    WelcomHotel Dwarka - Member ITC Hotel Group
                  </Typography>
                  <HolidayRating />
                </Box>
              </Box>
            </Grid>
            <Grid md={6}>
              <Box display="flex" ml={2} textAlign="center" alignItems="center">
                <Box sx={{ width: "20%", height: "30%" }}>
                  <img src={information} className="flight_img" />
                </Box>
                <Box sx={{ color: "red", display: "flex" }}>
                  <ul>
                    <li
                      style={{
                        fontSize: "10px",
                        color: "#252525",
                        fontWeight: "bold",
                        textAlign: "left",
                      }}
                    >
                      Visit Eravikulam National Park
                    </li>
                    <li
                      style={{
                        fontSize: "10px",
                        color: "#252525",
                        fontWeight: "bold",
                        textAlign: "left",
                      }}
                    >
                      Visit to Mattupetty Dam
                    </li>
                    <li
                      style={{
                        fontSize: "10px",
                        color: "#252525",
                        fontWeight: "bold",
                        textAlign: "left",
                      }}
                    >
                      Visit to Flower Garden
                    </li>
                  </ul>
                  <ul>
                    <li
                      style={{
                        fontSize: "10px",
                        color: "#252525",
                        fontWeight: "bold",
                        textAlign: "left",
                      }}
                    >
                      Visit to Tea Museum
                    </li>
                    <li
                      style={{
                        fontSize: "10px",
                        color: "#252525",
                        fontWeight: "bold",
                        textAlign: "left",
                      }}
                    >
                      Visit to Eco Point
                    </li>
                  </ul>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            py={3}
          >
            <FastfoodIcon sx={{ color: "#25B1CA", marginRight: "10px" }} />
            <Typography color="#252525" fontSize="12px" fontWeight="bold">
              Meal Plan:
            </Typography>
            <Typography color="#FF8900" fontSize="12px" fontWeight="bold">
              Meals as per hotel plan
            </Typography>
          </Box>
          <Box>
            <Box display="flex">
              <Typography color="#006FFF" fontSize="12px" fontWeight="bold">
                Day 2 -
              </Typography>
              <Typography color="#252525" fontSize="12px" fontWeight="bold">
                Sightseeing in Munnar
              </Typography>
            </Box>
            <Typography color="#666666" fontSize="12px" fontWeight="bold">
              Gear up for a full-day sightseeing tour of Munnar. Surrounded by
              lush greenery and lofty mountains, this hill station has lots in
              store for its visitors, making it one of the most sought-after
              destinations in the country. Some of the prominent attractions of
              this place are the Eravikulam National Park, Mattupetty Dam. After
              exploring the natural beauty of Munnar, return to the hotel and
              take a good night’s sleep.
            </Typography>
          </Box>

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
        </Box>
        <Box>
          <Grid container p={2}>
            <Grid md={6}>
              <Box display="flex" ml={2}>
                <Box sx={{ width: "20%", height: "30%" }}>
                  <img src="skyTrails" alt="skyTrails" className="flight_img" />
                </Box>
                <Box px={2}>
                  <Typography color="#252525" fontSize="12px" fontWeight="bold">
                    WelcomHotel Dwarka - Member ITC Hotel Group
                  </Typography>
                  <HolidayRating />
                </Box>
              </Box>
            </Grid>
            <Grid md={6}>
              <Box display="flex" ml={2} textAlign="center" alignItems="center">
                <Box sx={{ width: "20%", height: "30%" }}>
                  <img src={information} className="flight_img" />
                </Box>
                <Box sx={{ color: "red", display: "flex" }}>
                  <ul>
                    <li
                      style={{
                        fontSize: "10px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      Visit Periyar National Park
                    </li>
                  </ul>
                  <ul>
                    <li
                      style={{
                        fontSize: "10px",
                        color: "#252525",
                        fontWeight: "bold",
                      }}
                    >
                      Transfer to Airport by Car
                    </li>
                  </ul>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            py={3}
          >
            <FastfoodIcon sx={{ color: "#25B1CA", marginRight: "10px" }} />
            <Typography color="#252525" fontSize="12px" fontWeight="bold">
              Meal Plan:
            </Typography>
            <Typography color="#FF8900" fontSize="12px" fontWeight="bold">
              Meals as per hotel plan
            </Typography>
          </Box>
          <Box>
            <Box display="flex">
              <Typography color="#006FFF" fontSize="12px" fontWeight="bold">
                Day 3 -
              </Typography>
              <Typography color="#252525" fontSize="12px" fontWeight="bold">
                Drive from Munnar to Thekkady (130 km/approx. 4 hours)
              </Typography>
            </Box>
            <Typography color="#666666" fontSize="12px" fontWeight="bold">
              UpToday you may choose to indulge in adventure activities (on
              direct payment basis), like bamboo rafting, border hiking and
              trekking. For an adrenaline rush, you can also partake in other
              activities like wildlife train and hiking. Tourists also have an
              option of enjoying a boat ride (on direct payment basis) on the
              artificial lake in the Periyar Wildlife Sanctuary. This natural
              reserve is spread across an area of about 925 sq km and serves as
              a haven for wildlife. With rich biodiversity and scenic beauty,
              this park is certainly a paradise for nature lovers as well as
              wildlife enthusiasts. The presence of the beautiful artificial
              lake enhances the beauty of this park. After a thrilling
              experience all day long, return to the hotel and sleep the night
              away.
            </Typography>
          </Box>

          <Typography
            sx={{
              color: "#FF8900",
              fontSize: "16px",
              fontWeight: "bold",
              marginY: "10px",
            }}
          >
            Day 4
          </Typography>
        </Box>
        <Box>
          <Grid
            container
            p={2}
            textAlign="center"
            display="flex"
            justifyContent="center"
          >
            <Grid item lg={6}>
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
          </Grid>
          <Box>
            <Box display="flex">
              <Typography color="#006FFF" fontSize="12px" fontWeight="bold">
                Day 4 -
              </Typography>
              <Typography color="#252525" fontSize="12px" fontWeight="bold">
                Depart from Cochin
              </Typography>
            </Box>
            <Typography color="#666666" fontSize="12px" fontWeight="bold">
              Check-out from the hotel and leave for the Cochin Airport to board
              your return flight.
            </Typography>
          </Box>
        </Box>
        <form action="/HolidayGuestDetail">
          <Box textAlign="center" mt={3}>
            <Button
              variant="contained"
              textAlign="center"
              display="flex"
              justifyContent="center"
              type="submit"
            >
              Book Now
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Bookingdetailpackage;
