// AllHotelBooking.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableRow, Paper,TextField,InputAdornment,TableHead } from '@mui/material';
import '../HotelBookings/HotelBookings.css';
import SearchIcon from '@mui/icons-material/Search';
import { apiURL } from '../../../../../Constants/constant';


const AllBusCancelTickets = () => {
    const [hotelBookings, setHotelBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
      async function fetchHotelBookings() {
        try {
          setLoading(true); // Set loading to true when fetching data
          const response = await axios.get(
            `${apiURL.baseURL}/skytrails/api/agent/getCancelBusBooking`,
            {
              params: {
                page: currentPage,
                size: pageSize,
                search: searchTerm,
              }
            }
          );
          setHotelBookings(response.data.result.docs);
          setTotalPages(response.data.result.totalPages);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching hotel bookings:', error);
          setLoading(false);
        }
      }
  
      fetchHotelBookings();
    }, [currentPage, searchTerm]);
  
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
      setCurrentPage(1);
    };
  
    return (
      <div className='hotel-container'>
      <h3>AGENT HOTELTICKET CANCEL REQUEST</h3>
        <TextField
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by name, ID, etc."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        {loading ? (
          <div>Loading...</div>
        ) : (
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Bus ID</TableCell>
                  <TableCell>Agency Name</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>PNR</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Origin</TableCell>
                  <TableCell>Destination</TableCell>
                  <TableCell>DateOfJourney</TableCell>
                  <TableCell>busType</TableCell>
                  <TableCell>Approve</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {hotelBookings.map((booking) => (
                  <TableRow key={booking._id}>
                    <TableCell style={{color:"white"}}>{booking.busId}</TableCell>
                    <TableCell style={{color:"white"}}>{booking.userDetails.agency_details.agency_name}</TableCell>
                    <TableCell style={{color:"white"}}>{`${booking.userDetails.personal_details.first_name} ${booking.userDetails.personal_details.last_name}`}</TableCell>
                    <TableCell style={{color:"white"}}>{booking.userDetails.personal_details.mobile.mobile_number}</TableCell>
                    <TableCell style={{color:"white"}}>{booking.userDetails.personal_details.email}</TableCell>
                    <TableCell style={{color:"white"}}>{booking.reason}</TableCell>
                    <TableCell style={{color:"white"}}>{booking.bustDetails.pnr}</TableCell>
                    <TableCell style={{color:"white"}}>{booking.bustDetails.amount}</TableCell>
                    <TableCell style={{color:"white"}}>{booking.bustDetails.origin}</TableCell>
                    <TableCell style={{color:"white"}}>{booking.bustDetails.destination}</TableCell>
                    <TableCell style={{color:"white"}}>{booking.bustDetails.departureTime}</TableCell>
                    <TableCell style={{color:"white"}}>{booking.bustDetails.busType}</TableCell>
                    <TableCell style={{color:"white"}}><button>APPROVE</button></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        )}
        <div className="paginate">
          {Array.from({ length: totalPages }, (_, i) => (
            <button className='hotelButton' key={i + 1} onClick={() => handlePageChange(i + 1)}>
              <h5>{i + 1}</h5>
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default AllBusCancelTickets;
