import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  Button,
  Typography,
  Stack,
  Pagination,
  TableContainer,
  TableHead,
  IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { apiURL } from '../../../../../../Constants/constant';
import ApprovalIcon from '@mui/icons-material/CheckCircleOutline';
const AllHotelCancelTickets = () => {
  const [hotelBookings, setHotelBookings] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // New state for filtered data
  const [loading, setLoading] = useState(true);
  const pageSize = 10; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchHotelBookings() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiURL.baseURL}/skyTrails/api/admin/getchangeHotelRequestAgent`,
          {
            params: {
              page: currentPage,
              size: pageSize,
              search: searchTerm,
            },
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

  useEffect(() => {
    // Update filtered data when searchTerm changes
    const filteredResults = hotelBookings.filter((booking) =>
      Object.values(booking)
        .join('') // Combine all values into a single string
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredResults);
  }, [hotelBookings, searchTerm]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page when performing a new search
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

      <TableContainer component={Paper} className='custom-table-container'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Booking ID</TableCell>
              <TableCell>Agency Name</TableCell>
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
            {filteredData.map((booking) => (
              <TableRow key={booking.bookingId}>
                <TableCell>{booking.bookingId}</TableCell>
                <TableCell>
                  {booking.userDetails.agency_details.agency_name || 'No Data'}
                </TableCell>
                <TableCell>
                  {`${booking.userDetails.personal_details.first_name} ${booking.userDetails.personal_details.last_name}` ||
                    'No Data'}
                </TableCell>
                <TableCell>
                  {booking.userDetails.personal_details.mobile.mobile_number ||
                    'No Data'}
                </TableCell>
                <TableCell>
                  {booking.userDetails.personal_details.email || 'No Data'}
                </TableCell>
                <TableCell>{booking.reason || 'No Data'}</TableCell>
                <TableCell>{booking.hotelDetails.hotelId || 'No Data'}</TableCell>
                <TableCell>{booking.hotelDetails.amount || 'No Data'}</TableCell>
                <TableCell>{booking.hotelDetails.CheckInDate || 'No Data'}</TableCell>
                <TableCell>{booking.hotelDetails.destination || 'No Data'}</TableCell>
                <TableCell>{booking.hotelDetails.room || 'No Data'}</TableCell>
                <TableCell>{booking.hotelDetails.hotelName || 'No Data'}</TableCell>
                <TableCell style={{ border: 'none', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
                  <IconButton size="small" style={{ backgroundColor: '#21325D', color: '#FFFFFF' }}>
                    <ApprovalIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
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
