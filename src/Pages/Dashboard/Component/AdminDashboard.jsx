
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardActionArea, CardContent, Typography,Box } from '@mui/material';
import Groups3Icon from '@mui/icons-material/Groups3';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Groups2Icon from '@mui/icons-material/Groups2';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { apiURL } from '../../../Constants/constant';
import './AdminDashboard.css'; 
const AdminDashboardData = () => {
  // State to hold dashboard data
  const [dashboardData, setDashboardData] = useState({});
  const icons = [CollectionsBookmarkIcon, CollectionsBookmarkIcon,CollectionsBookmarkIcon ,CollectionsBookmarkIcon,Groups3Icon,Diversity1Icon,AccountBoxIcon]; 

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch data from the API endpoint
        const response = await axios.get(`${apiURL.baseURL}/skytrails/api/admin/adminDashBoard`);
        setDashboardData(response.data.result);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const handleCardClick = async (key) => {
    if (key === 'TotalBooking') {
      try {
        const bookingListResponse = await axios.get(`${apiURL.baseURL}/skytrails/api/admin/getAllFlightBookingList`);
        // Handle the booking list data as needed
        console.log('Booking List:', bookingListResponse.data.result);
      } catch (error) {
        console.error('Error fetching booking list data:', error);
      }
    }
    // Add more conditions for other sections if needed
  };

  return (
    <Grid container spacing={3} className="admin-dashboard-grid" style={{ marginTop: '50px' }}>
      {Object.keys(dashboardData).map((key, index) => (
        <Grid item xs={12} sm={6} md={4} key={index} className={`grid-item grid-item-${index}`}>
          <Card
            className={`admin-dashboard-card admin-dashboard-card-${index}`}
            sx={{ position: 'relative', maxWidth: 345, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            onClick={() => handleCardClick(key)}
          >
            <CardActionArea className={`card-action-area card-action-area-${index}`}>
              <CardContent className={`card-content card-content-${index}`}>
                <Box position="absolute" top={0} right={0} className={`box box-${index}`}>
                  {icons[index % icons.length] && React.createElement(icons[index % icons.length])}
                </Box>
                <Typography gutterBottom variant="h6" component="div" className={`typography-h6 typography-h6-${index}`}>
                  {key}
                </Typography>
                <Typography variant="body2" color="text.secondary" className={`typography-body2 typography-body2-${index}`}>
                  {dashboardData[key]}
                </Typography>
                {key === 'TotalBookings' && (
                  <div className="progress-bar-container">
                    <div className="progress-bar"></div>
                  </div>
                )}
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AdminDashboardData;

