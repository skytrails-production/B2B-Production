import React, { useState, useEffect } from 'react';
import { Paper, Typography, Pagination, Stack, TextField, InputAdornment,GridToolbar } from '@mui/material';
import { apiURL } from '../../../../Constants/constant';
import './EventList.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`${apiURL.baseURL}/skyTrails/api/admin/getAllEventBookings?page=${currentPage}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
       // console.log(data);
        setEvents(data.result.docs);
        setTotalPages(data.result.totalPages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchEventData();
  }, [currentPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Paper
      className="subada-table-container"
      elevation={3}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: 'white',
        padding: '20px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div
        className="adsearch-bar"
        style={{
          position: 'absolute',
          top: 10,
          zIndex: 1,
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center', 
          width: '92%',
        }}
      >
        <Typography variant="h5" className="adtable-heading" style={{ marginLeft: '20px', color: 'white',fontWeight:'500'}}>
          All Event List
        </Typography>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="city-package-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Profession</th>
              <th>Event Name</th>
              <th>Venue</th>
              <th>Event Date</th>
              <th>Mobile</th>
             
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index}>
               
                <td style={{ backgroundColor: 'white', color: 'black' }}>{event.name}</td>
                <td style={{ backgroundColor: 'white', color: 'black' }}>{event.city}</td>
                <td style={{ backgroundColor: 'white', color: 'black' }}>{event.profession}</td>
                <td style={{backgroundColor: 'white', color: 'black'}}>{event.eventDetails.title}</td>
                <td style={{backgroundColor: 'white',color: 'black'}}>{event.eventDetails.venue}</td>
                <td style={{backgroundColor: 'white' ,color: 'black'}}>{new Date(event.eventDate).toLocaleDateString('en-US')}</td>
               <td style={{ backgroundColor: 'white', color: 'black' }}>{event.contactNo?.mobile_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Stack spacing={2} direction="row" justifyContent="center" mt={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Stack>
    </Paper>
  );
};

export default EventList;










