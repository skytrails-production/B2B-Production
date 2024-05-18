import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  LinearProgress,
} from "@mui/material";
import {
  Groups3 as Groups3Icon,
  AccountBox as AccountBoxIcon,
  GroupsTwo as Groups2Icon,
  PeopleAlt as Diversity1Icon,
  CollectionsBookmark as CollectionsBookmarkIcon,
  Flight as FlightIcon,
  DirectionsBus as BusIcon,
  Hotel as HotelIcon,
  CollectionsBookmark as TotalBookingsIcon,
  EmojiEvents as EmojiEventsIcon,
  
} from "@mui/icons-material";

import { apiURL } from "../../../Constants/constant";
import "./AdminDashboard.css";
import AddMarkup from "./Table/AddMarkup";
import {
  Groups as AdminIcon, // Add the import for the Admin icon
} from "@mui/icons-material";
import {
  RequestQuote as ChangeRequestIcon, // Add the import for the Change Request icon
} from "@mui/icons-material";
import {
  Cancel as CancelledIcon, // Add the import for the Cancelled icon
} from "@mui/icons-material";
import {
  RingLoader,
} from "react-spinners";

const AdminDashboardData = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(true);
  const icons = [
    HotelIcon,
    FlightIcon,
    BusIcon,
    TotalBookingsIcon,
    AdminIcon,
    AdminIcon,
    
    Groups3Icon,
    CancelledIcon,
    ChangeRequestIcon,
    EmojiEventsIcon,
    
  ];
  const headingsArray = [
    "Hotel",
    "Flight",
    "Bus",
    "TotalBookings",
    "Subadmin",
    "User",
    "Agent",
    "Cancelled",
    "Change Request",
    "Event Booking"
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skytrails/api/admin/adminDashBoard`
        );
        setDashboardData(response.data.result);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false); // Set loading to false whether the request was successful or not
      }
    };

    fetchDashboardData();
  }, []);
  // useEffect(()=>{
    
  // })

  const handleCardClick = async (key) => {
    if (key === "TotalBooking") {
      try {
        const bookingListResponse = await axios.get(
          `${apiURL.baseURL}/skytrails/api/admin/getAllFlightBookingList`
        );
        // Handle the booking list data as needed
        // console.log('Booking List:', bookingListResponse.data.result);
      } catch (error) {
        console.error("Error fetching booking list data:", error);
      }
    }
    // Add more conditions for other sections if needed
  };

  return (
    <div className="admin-dashboard-container">
    <Grid container spacing={3}   className={`admin-dashboard-grid ${loading ? 'loading' : ''}`}>
     
      {loading ? (
         <div className="admin-dashboard-loader">
      
        <RingLoader
          loading={loading}
          size={80}
          sizeUnit={"px"}
          color="#21325D"
      
         //  style={{ marginTop: "20px" }}
        />
        </div>
      ) : (

        Object.keys(dashboardData).map((key, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <div
              style={{
                position: 'relative',
                top: '8px',
                left: '60px',
                
              }}
            >
              <div
                className="icon-container"
                style={{
                  position: 'absolute',
                  zIndex: '1',
                  boxShadow: "0px 4px 8px rgba(33, 50, 93, 0.5)",
                  transform: 'translateX(-50%)',
                  width: "60px",
                  height: "60px",
                  backgroundColor: "#21325D",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "8px",
                }}
              >
                {icons[index % icons.length] &&
                  React.createElement(icons[index % icons.length], {
                    fontSize: "large",
                    style: { color: "white" },
                  })}
              </div>
            </div>

            <Card
              className={`admin-dashboard-card admin-dashboard-card-${index}`}
              onClick={() => handleCardClick(key)}
              style={{
                borderRadius: 8,
                zIndex: 0,
                height: "110px",
                // position: 'relative',
              }}
            >
              <CardActionArea
                style={{
                  display: "flex",
                  justifyContent: "right",
                  height: "100%",
                }}
              >
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {headingsArray[index]}
                  </Typography>
                  <Typography variant="h5">{dashboardData[key]}</Typography>
                  {key === "TotalBookings" && (
                    <div className="progress-bar-container">
                      <LinearProgress
                        variant="determinate"
                        value={50}
                        sx={{ height: 10, borderRadius: 5 }}
                      />
                    </div>
                  )}
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
    </div>
  );
};

export default AdminDashboardData;
