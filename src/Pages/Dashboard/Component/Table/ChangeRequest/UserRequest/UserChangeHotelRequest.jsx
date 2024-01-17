import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table, TableBody, TableCell, TableRow, Paper, TextField, InputAdornment, IconButton, Typography,
  Stack,
  Pagination,
  TableContainer,
  TableHead,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { apiURL } from '../../../../../../Constants/constant';
import ApprovalIcon from '@mui/icons-material/CheckCircleOutline';
const AllHotelCancelTickets = () => {
  const [hotelBookings, setHotelBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]); // New state for filtered data
  useEffect(() => {
    async function fetchHotelBookings() {
      try {
        const response = await axios.get(
          `${apiURL.baseURL}/skytrails/api/agent/getCancelHotelBooking`,
          {
            params: {
              page: currentPage,
              size: pageSize,
              search: searchTerm,
            }
          }
        );
        setHotelBookings(response.data.result.docs);
        setFilteredData(response.data.result.docs); // Set filtered data initially
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
    <div className="subada-table-container">
      <div className='adsearch-bar'>
        <TextField
          type='text'
          value={searchTerm}
          onChange={handleSearch}
          placeholder='Search by name, ID, etc.'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Typography variant='h5' className='adtable-heading'>
          AGENT HOTEL TICKET CHANGE REQUEST
        </Typography>
      </div>

      {/* <th>Booking ID</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Reason</th>
            <th>Hotel ID</th>
            <th>Amount</th>
            <th>CheckInDate</th>
            <th>Destination</th>
            <th>Rooms</th>
            <th>Hotel Name</th>
            <th>Approve</th> */}
      <TableContainer component={Paper} className='custom-table-container'>
        <Table>
          <TableHead>
            <TableRow> <TableCell>Booking ID</TableCell>

              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Hotel ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>CheckInDate</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Rooms</TableCell>
              <TableCell>Hotel Name</TableCell>
              <TableCell>Approve</TableCell>
            </TableRow>

          </TableHead>

          <TableBody className="tableadagent">
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" style={{ border: 'none' }}>
                  <Typography variant="h6">Not Available</Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredData.map((booking) => (
                <TableRow key={booking?.bookingId}>
                  <TableCell>{booking?.bookingId}</TableCell>
                  <TableCell>{`${booking?.userDetails.personal_details.first_name} ${booking.userDetails.personal_details.last_name}` || "No Data"}</TableCell>
                  <TableCell>{booking?.userDetails.personal_details.mobile.mobile_number || "No Data"}</TableCell>
                  <TableCell>{booking?.userDetails.personal_details.email || "No Data"}</TableCell>
                  <TableCell>{booking?.reason || "No Data"}</TableCell>
                  <TableCell>{booking?.hotelDetails.hotelId || "No Data"}</TableCell>
                  <TableCell>{booking?.hotelDetails.amount || "No Data"}</TableCell>
                  <TableCell>{booking?.hotelDetails.CheckInDate || "No Data"}</TableCell>
                  <TableCell>{booking?.hotelDetails.destination || "No Data"}</TableCell>
                  <TableCell>{booking?.hotelDetails.room || "No Data"}</TableCell>
                  <TableCell>{booking?.hotelDetails.hotelName || "No Data"}</TableCell>
                  <TableCell style={{ border: 'none', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                    <IconButton size="small" style={{ backgroundColor: '#21325D', color: '#FFFFFF' }}>
                      <ApprovalIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>

              )))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack spacing={2} direction='row' justifyContent='center' mt={2}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, page) => handlePageChange(page)}
          color='primary'
        />
      </Stack>
    </div>
  );
};

export default AllHotelCancelTickets;
